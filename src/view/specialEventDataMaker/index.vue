<script lang="ts" setup>
import Clipboard from 'clipboard'

import { v4 as uuidv4 } from 'uuid';

import myAxios from '@/axios'

import { useCarInfosStore } from '@/store/carInfos'
import { CascaderOption, useMessage } from 'naive-ui'
import { OnUpdateValue } from 'naive-ui/es/cascader/src/interface';

const carInfosStore = useCarInfosStore()
const message = useMessage()

const form = ref<SED>({
  havePack: true,
  "haveClubRewords": false,
  "haveSkin": true,
  "havePackConditions": true,
  "haveEventKey": false,
  "packConditions": 285,
  "dataTableImage": '',
  "toolCars": [],
  "notes": [],
  "processRewords": [],
  "stages": []
})

const formJsonString = computed(() => JSON.stringify(form.value, null, 2))

const onInputNotes = (notes: string) => form.value.notes = notes.split('\n')

const onCheckPackConditions = (checked: boolean) => {
  form.value.havePackConditions = checked
  if (!checked) {
    form.value.packConditions = 0
  }
}


onMounted(() => {
  const clipboard = new Clipboard("#copy-sed-json");
  clipboard.on("success", function (e) {
    message.success('复制成功！')
    e.clearSelection();
  });
  clipboard.on("error", function (e) {

  });

})


onMounted(() => {
  myAxios.get('/api/getCarIds').then(res => {
    console.log(res)
    let glInfo: carInfo[] = res.data[0].data
    let alInfo: carInfo[] = res.data[1].data


    carInfosStore.setCarids({
      gl: glInfo,
      al: alInfo
    })
    console.log(carInfosStore.alOptions)
  })
})

const toolCarsValue = ref(null)
//ref<CascaderOption []>([])
// const toolCarOptions =

onMounted(() => {

})

const handleUpdateToolCarsValue: OnUpdateValue = (value, option, path) => {
  console.log(value)
}

const onAddProcessReword = () => {
  form.value.processRewords.push({
    uuid: uuidv4(),
    conditions: 0,
    reword: {
      uuid: uuidv4(),
      type: 'seCard',
      count: 1,
    }
  })
}

const onCopyProcessReword = (index: number) => {
  const reword = form.value.processRewords[index]
  const copy: processReword = JSON.parse(JSON.stringify(reword))
  copy.uuid = uuidv4()
  copy.conditions = form.value.processRewords[form.value.processRewords.length - 1].conditions
  form.value.processRewords.push(copy)
}

interface rewordOption {
  label: string,
  value: rewordType
}

const rewordOptionsArray: rewordOption[] = [
  {
    label: '图纸',
    value: 'seCard'
  },
  {
    label: '蓝币',
    value: 'token'
  },
  {
    label: '金币',
    value: 'credit'
  },
  {
    label: '金卡',
    value: 'sePart'
  },
  {
    label: '赛事包',
    value: 'sePack'
  },
  {
    label: '钥匙',
    value: 'seKey'
  },
  {
    label: '贴纸',
    value: 'seSkin'
  },
]

const rewordOptions = ref<rewordOption[]>(rewordOptionsArray)

const onAddStage = () => {
  form.value.stages.push({
    uuid: uuidv4(),
    clubRewords: [],
    unlockConditions: form.value.stages[form.value.stages.length - 1]?.unlockConditions || 0,
    missions: [],
  })
}

const onAddStageClubReword = (clubRewords: reword[]) => {
  clubRewords.push({
    uuid: uuidv4(),
    type: 'seCard',
    count: 1,
  })
}

const onAddStageMission = (missions: mission[]) => {
  missions.push({
    uuid: uuidv4(),
    conditions: 0,
    join: {
      star: 0,
      rank: 0,
    },
    rewords: [],
    toolCars: [],
  })
}


// const copyStageOpstions=computed(()=>Array(form.value.stages.length).fill(null).map((value,index)=>({
//   value:index+1,
//   label:
// })))
const onCopyStage = (index: number) => {
  let stage = form.value.stages[index]
  let copy: stage = JSON.parse(JSON.stringify(stage))
  copy.uuid = uuidv4()
  copy.unlockConditions = form.value.stages[form.value.stages.length - 1].unlockConditions
  // 更深的uuid就不重新赋值了
  form.value.stages.push(copy)
}

</script>

<template>
  <div style="padding:1em;">
    <n-space item-style="display: flex;">
      <n-checkbox v-model:checked="form.havePack">赛事包</n-checkbox>
      <n-checkbox v-model:checked="form.haveSkin">赛事贴纸</n-checkbox>
      <n-checkbox v-model:checked="form.haveEventKey">赛事钥匙</n-checkbox>
    </n-space>
    <n-space item-style="display: flex;">
      <n-checkbox :checked="form.havePackConditions" :on-update:checked="onCheckPackConditions">商店包条件>0</n-checkbox>
      <n-input-number v-model:value="form.packConditions" :disabled="!form.havePackConditions" min="0" :precision="0">
      </n-input-number>
    </n-space>

    <div>工具车（特赛车请放在最后）</div>
    <n-cascader v-model:value="toolCarsValue" multiple clearable placeholder="选择工具车" expand-trigger=" hover"
      :options="carInfosStore.alOptions" :cascade="false" check-strategy="child" :show-path="false"
      @update:value="handleUpdateToolCarsValue" />

    <div>数据表图片地址，可不填</div>
    <n-input v-model:value="form.dataTableImage" type="text" placeholder="数据表图片地址" />
    <div>备注</div>
    <n-input :value="form.notes.join('\n')" :on-input="onInputNotes" type="textarea" placeholder="写点啥" />

    <div>进度奖励</div>
    <div>
      <div class="process-reword" v-for="(pR, index) in form.processRewords" :key="pR.uuid">
        <div style="display:flex; align-items: center; gap:20px;margin-top: 20px;">

          条件：<n-input-number v-model:value="pR.conditions" min="0"></n-input-number>
          类型：
          <n-select style="width:150px;" v-model:value="pR.reword.type" :options="rewordOptions" />
          数量：<n-input-number v-model:value="pR.reword.count" min="0"></n-input-number>
          <n-popconfirm @positive-click="form.processRewords.splice(index, 1)">
            <template #trigger>
              <n-button type="warning">删除</n-button>
            </template>
            确认删除
          </n-popconfirm>
          <n-button @click="onCopyProcessReword(index)">复制到最后</n-button>
        </div>

      </div>
      <n-button @click="onAddProcessReword">添加进度奖励</n-button>
    </div>

    <div>阶段奖励</div>
    <div style="margin-left: 2em;">
      <div class="stage" v-for="(stage, index) in form.stages" :key="stage.uuid">
        <div style="display:flex; align-items: center; gap:20px;margin-top: 20px;">
          <div> 阶段{{ index + 1 }}</div>

          解锁条件：<n-input-number v-model:value="stage.unlockConditions" min="0"></n-input-number>

          <n-popconfirm @positive-click="form.stages.splice(index, 1)">
            <template #trigger>
              <n-button type="warning">删除</n-button>
            </template>
            确认删除
          </n-popconfirm>

          <n-button @click="onCopyStage(index)">复制到最后</n-button>
        </div>
        <div>俱乐部奖励</div>
        <div style="margin-left:2em;">
          <div class="process-reword" v-for="(pR, indexClubRewords) in stage.clubRewords" :key="pR.uuid">
            <div style="display:flex; align-items: center; gap:20px;margin-top: 20px;">

              类型：
              <n-select style="width:150px;" v-model:value="pR.type" :options="rewordOptions" />
              数量：<n-input-number v-model:value="pR.count" min="0"></n-input-number>
              <n-popconfirm @positive-click="stage.clubRewords.splice(indexClubRewords, 1)">
                <template #trigger>
                  <n-button type="warning">删除</n-button>
                </template>
                确认删除
              </n-popconfirm>
            </div>

          </div>
          <n-button @click="onAddStageClubReword(stage.clubRewords)">添加俱乐部奖励</n-button>
        </div>

        <div>任务列表</div>
        <div style="margin-left: 2em;">
          <div v-for="(mission, indexMission) in stage.missions" :key="mission.uuid">

            <div style="display:flex; align-items: center; gap:20px;margin-top: 20px;">
              条件数量：<n-input-number v-model:value="mission.conditions" min="0"></n-input-number>
              星级要求：<n-input-number v-model:value="mission.join.star" min="0" max="6"></n-input-number>
              性能分要求：<n-input-number v-model:value="mission.join.rank" min="0"></n-input-number>
              <n-popconfirm @positive-click="stage.missions.splice(indexMission, 1)">
                <template #trigger>
                  <n-button type="warning">删除</n-button>
                </template>
                确认删除
              </n-popconfirm>
            </div>
          </div>

          <n-button @click="onAddStageMission(stage.missions)">添加任务</n-button>
        </div>

      </div>
      <n-button @click="onAddStage">添加阶段</n-button>
      <!-- <n-popselect
    :options="copyStageOpstions"
    @update:value="onCopyStage"
    size="medium"
    scrollable
  >

    <n-button >从...阶段复制</n-button>
  </n-popselect> -->
    </div>


    <n-button id="copy-sed-json" :data-clipboard-text="formJsonString">复制代码</n-button>

    <pre style="font-family:Consolas;">{{ formJsonString }}</pre>
  </div>
</template>