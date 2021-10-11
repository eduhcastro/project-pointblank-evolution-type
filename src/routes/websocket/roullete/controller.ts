class RoulleteController {

  constructor() {
    this.Start = 3
    this.MaxPixel = 7709.58
    this.MinPixel = 0
    this.BoxRewardWidth = 95
    this.BoRewardHeight = 78.889
    this.RoulleteWidth = 9975
  }

  MaxPixel: number
  MinPixel: number
  BoxRewardWidth: number
  BoRewardHeight: number
  Start: number
  RoulleteWidth: number

  private RewardsList(): Array<any> {
    let rewards: Array<any> = [
     //{number:  1   ,param: "", proba: 2},
     //{number:  14  ,param: "", proba: 2},
     //{number:  2   ,param: "", proba: 2},
     //{number:  13  ,param: "", proba: 2},
     //{number:  3   ,param: "", proba: 2},
     //{number:  12  ,param: "", proba: 2},
     //{number:  4   ,param: "", proba: 2},
     //{number:  0   ,param: "", proba: 2},
     //{number:  11  ,param: "", proba: 2},
     //{number:  5   ,param: "", proba: 2},
     //{number:  10  ,param: "", proba: 2},
     //{number:  6   ,param: "", proba: 2},
     //{number:  9   ,param: "", proba: 2},
     //{number:  7   ,param: "", proba: 2},
     //{number:  8   ,param: "", proba: 2}
      {number:  1   , color:"red"          ,param: "755",  proba: 2},
      {number:  14  , color:"black"        ,param: "850",  proba: 2},
      {number:  2   , color:"red"          ,param: "955",  proba: 2},
      {number:  13  , color:"black"        ,param: "1050", proba: 2},
      {number:  3   , color:"red"          ,param: "1155", proba: 2},
      {number:  12  , color:"black"        ,param: "1250", proba: 2},
      {number:  4   , color:"red"          ,param: "1355", proba: 2},
      {number:  0   , color:"green"        ,param: "1450", proba: 2},
      {number:  11  , color:"red"          ,param: "1555", proba: 2},
      {number:  5   , color:"black"        ,param: "1650", proba: 2},
      {number:  10  , color:"red"          ,param: "1755", proba: 2},
      {number:  6   , color:"black"        ,param: "1850", proba: 2},
      {number:  9   , color:"red"          ,param: "1955", proba: 2},
      {number:  7   , color:"black"        ,param: "2050", proba: 2},
      {number:  8   , color:"red"          ,param: "2155", proba: 2},
      {number:  1   , color:"black"        ,param: "2250", proba: 2},
      {number:  14  , color:"red"          ,param: "2355", proba: 2},
      {number:  2   , color:"black"        ,param: "2450", proba: 2},
      {number:  13  , color:"red"          ,param: "2555", proba: 2},
      {number:  3   , color:"black"        ,param: "2650", proba: 2},
      {number:  12  ,  color:"red"          ,param: "2755", proba: 2},
      {number:  4   ,  color:"black"        ,param: "2850", proba: 2},
      {number:  0   ,  color:"green"          ,param: "2955", proba: 2},
      {number:  11  ,  color:"black"        ,param: "3050", proba: 2},
      {number:  5   ,  color:"red"         ,param: "3155", proba: 2},
      {number:  10  ,  color:"black"       ,param: "3250", proba: 2},
      {number:  6   ,  color:"red"         ,param: "3355", proba: 2},
      {number:  9   ,  color:"black"       ,param: "3450", proba: 2},
      {number:  7   ,  color:"red"         ,param: "3555", proba: 2},
      {number:  8   ,  color:"black"       ,param: "3650", proba: 2},
      {number:  1   ,  color:"red"       ,param: "3755", proba: 2},
      {number:  14  ,  color:"black"     ,param: "3850", proba: 2},
      {number:  2   ,  color:"red"         ,param: "3955", proba: 2},
      {number:  13  ,  color:"black"       ,param: "4050", proba: 2},
      {number:  3   ,  color:"red"         ,param: "4155", proba: 2},
      {number:  12  ,  color:"black"       ,param: "4250", proba: 2},
      {number:  4   ,  color:"red"         ,param: "4355", proba: 2},
      {number:  0   ,  color:"green"       ,param: "4450", proba: 2},
      {number:  11  ,  color:"red"          ,param: "4555", proba: 2},
      {number:  5   ,  color:"black"        ,param: "4650", proba: 2},
      {number:  10  ,  color:"red"         ,param: "4755", proba: 2},
      {number:  6   ,  color:"black"       ,param: "4850", proba: 2},
      {number:  9   ,  color:"red"         ,param: "4955", proba: 2},
      {number:  7   ,  color:"black"       ,param: "5050", proba: 2},
      {number:  8   ,  color:"red"       ,param: "5155", proba: 2},
      {number:  1   ,  color:"black"     ,param: "5250", proba: 2},
      {number:  14  ,  color:"red"          ,param: "5355", proba: 2},
      {number:  2   ,  color:"red"        ,param: "5450", proba: 2},
      {number:  13  ,  color:"black"         ,param: "5555", proba: 2},
      {number:  3   ,  color:"red"       ,param: "5650", proba: 2},
      {number:  12  ,  color:"black"         ,param: "5755", proba: 2},
      {number:  4   ,  color:"red"       ,param: "5850", proba: 2},
      {number:  0   ,  color:"green"          ,param: "5955", proba: 2},
      {number:  11  ,  color:"black"        ,param: "6050", proba: 2},
      {number:  5   ,  color:"red"        ,param: "6155", proba: 2},
      {number:  10  ,  color:"black"      ,param: "6250", proba: 2},
      {number:  6   , color:"red"       ,param: "6355", proba: 2},
      {number:  9   , color:"black"     ,param: "6450", proba: 2},
      {number:  7   ,  color:"red"         ,param: "6555", proba: 2},
      {number:  8   ,  color:"black"       ,param: "6650", proba: 2},
      {number:  1   ,  color:"red"        ,param: "6755", proba: 2},
      {number:  14  ,  color:"black"      ,param: "6850", proba: 2},
      {number:  2   ,  color:"red"        ,param: "6955", proba: 2},
      {number:  13  ,  color:"black"      ,param: "7050", proba: 2},
      {number:  3   ,  color:"red"       ,param: "7155", proba: 2},
      {number:  12  ,  color:"black"     ,param: "7250", proba: 2},
      {number:  4   , color:"red"        ,param: "7355", proba: 2},
      {number:  0   , color:"green"        ,param: "7450", proba: 2}
      //{number:  11  , color:""        ,param: "7555", proba: 2},
      //{number:  5   , color:""        ,param: "7650", proba: 2},
      //{number:  10  , color:""        ,param: "7755", proba: 2},
      //{number:  6   , color:""        ,param: "7850", proba: 2},
      //{number:  9   , color:""        ,param: "7955", proba: 2},
      //{number:  7   , color:""        ,param: "8050", proba: 2},
      //{number:  8   , color:""        ,param: "8155", proba: 2},
      //{number:  1   , color:""        ,param: "8250", proba: 2},
      //{number:  14  , color:""        ,param: "8355", proba: 2},
      //{number:  2   , color:""        ,param: "8450", proba: 2},
      //{number:  13  , color:""        ,param: "8555", proba: 2},
      //{number:  3   , color:""        ,param: "8650", proba: 2},
      //{number:  12  , color:""        ,param: "8755", proba: 2},
      //{number:  4   , color:""        ,param: "8850", proba: 2},
      //{number:  0   , color:""        ,param: "8955", proba: 2},
      //{number:  11  , color:""        ,param: "9050", proba: 2},
      //{number:  5   , color:""        ,param: "9155", proba: 2},
      //{number:  10  , color:""        ,param: "9250", proba: 2},
      //{number:  6   , color:""        ,param: "9355", proba: 2},
      //{number:  9   , color:""        ,param: "9450", proba: 2},
      //{number:  7   , color:""        ,param: "9555", proba: 2},
      //{number:  8   , color:""        ,param: "9650", proba: 2},
      //{number:  1   , color:""        ,param: "9755", proba: 2},
      //{number:  14  , color:""        ,param: "9850", proba: 2},
      //{number:  2   , color:""        ,param: "9955", proba: 2},
      //{number:  13  , color:""        ,param: "", proba: 2},
      //{number:  3   , color:""        ,param: "", proba: 2},
      //{number:  12  , color:""        ,param: "", proba: 2},
      //{number:  4   , color:""        ,param: "", proba: 2},
      //{number:  0   , color:""        ,param: "", proba: 2},
      //{number:  11  , color:""        ,param: "", proba: 2},
      //{number:  5   , color:""        ,param: "", proba: 2},
      //{number:  10  , color:""        ,param: "", proba: 2},
      //{number:  6   , color:""        ,param: "", proba: 2},
      //{number:  9   , color:""        ,param: "", proba: 2},
      //{number:  7   , color:""        ,param: "", proba: 2},
      //{number:  8   , color:""        ,param: "", proba: 2}
    ]
    return rewards[Math.floor(Math.random() * rewards.length)];
  }

  private GenereteRandomReward() : any{
    const Rewards = this.RewardsList()
    return Rewards
  }

  private GenereteRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private GenereateRandomPixel(Current: number): Array<any> {
    //const NewTarget = `${this.GenereteRandomNumber(1, 7)}${this.GenereteRandomNumber(0, 9)}${this.GenereteRandomNumber(0, 9)}${this.GenereteRandomNumber(0, 9)}`
    //const ApproximateMax = Math.abs((Number(NewTarget) + Current) - this.MaxPixel) < 100
    const TwoTarget = this.GenereteRandomReward()
    const ThreeTarget = Number(TwoTarget.param) + this.GenereteRandomNumber(10,70)
    return [{
      number: TwoTarget.number,
      color:  TwoTarget.color,
      param:  ThreeTarget,
    }]
  }

  public Execute(Current: number) {
    return this.GenereateRandomPixel(Current)
  }

 
}
export { RoulleteController }