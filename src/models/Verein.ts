import {Mannschaft} from "./Mannschaft";

export class Verein {
  public allMannschaft:Array<Mannschaft>;

  public id:number;
  public name:String;


  public constructor(name: String) {
    this.name = name;
    this.allMannschaft = [];
    this.id = null;
  }

  public static fromJSON(json:any):Verein{
    const verein = new Verein(json.name);
    verein.id=json.id;
    if(json.allMannschaft){
      const allMannschaft:Array<Mannschaft> = json.allMannschaft;
      verein.allMannschaft = [];
      for(const mannschaftJson of allMannschaft){
        // TODO
      }
    }
    return verein
  }

}
