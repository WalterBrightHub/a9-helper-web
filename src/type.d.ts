

interface carInfo{
  _id:string,
  fullName:string,
  nickName:string,
  car_id:string,
  carClass:"D"|"C"|"B"|"A"|"S"
}

interface carInfos{
  D:carInfo[],
  C:carInfo[],
  B:carInfo[],
  A:carInfo[],
  S:carInfo[],
}