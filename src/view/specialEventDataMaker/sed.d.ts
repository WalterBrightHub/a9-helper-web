interface toolCar {
  "_id": string,
  "fullName": string,
  "nickName": string,
  "isKeyCar": boolean,
  "rankLimits": number[],
  "star": number,
}

interface reword {

  "type": string,
  "count": number
}
interface processReword {
  "conditions": number,
  "reword": reword
}

interface join {
  "freeTry": boolean,
  "star": number,
  "rank": number
}

interface toolCar{
  car_id:string,
  freeTry:boolean
}

interface mission {
  toolCars: toolCar[],
  join: join,
  conditions:number,
  rewords:reword[]
}


interface stage {
  clubRewords?: reword[],
  unlockConditions: number,
  missions: mission[],
}

interface SED {
  havePack: Boolean,
  "haveClubRewords": Boolean,
  "haveSkin": Boolean,
  "havePackConditions": Boolean,
  "haveEventKey": Boolean,
  "packConditions": Number,
  "dataTableImage": string,
  "toolCars": toolCar[],
  "notes": string[],
  "processRewords": processReword[],
  "stages": stage[]
}
