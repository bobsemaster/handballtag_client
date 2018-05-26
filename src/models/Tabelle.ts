import {Mannschaft} from "./Mannschaft";
import {Jugend} from "./Jugend";

export class Tabelle {


  public id:number;
  public allMannschaft:Mannschaft;
  public jugend:Jugend;

  public static fromJson(json:any):Tabelle{
    const tabelle = new Tabelle();

    return tabelle;
  }
}
