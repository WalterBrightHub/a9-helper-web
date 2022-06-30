
interface UUID {
  uuid: string,
}

interface SEToolCar {
  "car_id": string,
  "fullName": string,
  "nickName": string,
  "isKeyCar": boolean,
  "rankLimits": number[],
  "star": number,
}

interface reword extends UUID {

  "type": "seCard" | "seKey" | "token" | "sePack" | "sePart" | "credit" | "seSkin",
  "count": number
}

type rewordType = reword['type']

interface processReword extends UUID {
  "conditions": number,
  "reword": reword
}

interface join {
  "star": number,
  "rank": number
}

interface toolCar {
  car_id: string,
  freeTry: boolean
}

interface mission extends UUID {
  toolCars: toolCar[],
  join: join,
  conditions: number,
  rewords: reword[]
}


interface stage extends UUID {
  clubRewords: reword[],
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
  "toolCars": SEToolCar[],
  "notes": string[],
  "processRewords": processReword[],
  "stages": stage[]
}
