<script lang="ts" setup>
import Clipboard from 'clipboard'

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

const getInfo = (info: carInfo[]) => info.reduce((res: carInfos, curr) => {
  res[curr.carClass].push(curr)
  return res
}, {
  D: [],
  C: [],
  B: [],
  A: [],
  S: [],
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
const toolCarOptions =

  onMounted(() => {

  })

const handleUpdateToolCarsValue: OnUpdateValue = (value, option, path) => {
  console.log(value)
}

</script>

<template>
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

  <n-cascader v-model:value="toolCarsValue" multiple clearable placeholder="选择工具车" expand-trigger=" hover"
    :options="carInfosStore.alOptions" :cascade="false" check-strategy="child" :show-path="false"
    @update:value="handleUpdateToolCarsValue" />

  <n-input v-model:value="form.dataTableImage" type="text" placeholder="数据表图片地址" />
  <n-input :value="form.notes.join('\n')" :on-input="onInputNotes" type="textarea" placeholder="写点啥" />
  <n-button id="copy-sed-json" :data-clipboard-text="formJsonString">复制代码</n-button>
  <pre style="font-family:Consolas;">{{ formJsonString }}</pre>
</template>