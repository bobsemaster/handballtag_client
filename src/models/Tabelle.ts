import {Mannschaft} from "./Mannschaft";
import {Jugend} from "./Jugend";

export class Tabelle {


  public id: number;
  public allMannschaft: Mannschaft[];
  public jugend: Jugend;


  constructor() {
    this.id = null;
    this.allMannschaft = [];
  }

  public static fromJson(json: any): Tabelle {
    if (json == null) {
      return null;
    }
    const tabelle = new Tabelle();
    tabelle.jugend = Jugend.fromJson(json.jugend);
    tabelle.id = json.id;
    if (json.allMannschaft) {
      for (const mannschaft of json.allMannschaft) {
        tabelle.allMannschaft.push(Mannschaft.fromJSON(mannschaft))
      }
    }
    return tabelle;
  }
}
