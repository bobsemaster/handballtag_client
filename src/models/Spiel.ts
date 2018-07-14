import {Mannschaft} from "./Mannschaft";

export class Spiel {
  public id: number;
  public heimMannschaft: Mannschaft;
  public gastMannschaft: Mannschaft;
  public heimTore: number;
  public gastTore: number;
  public hasHalftime: boolean;
  public halftimeDuration: number;
  public dateTime: Date;
  public isKampfgerichtAnwesend: boolean;
  public isSchiedsrichterAnwesend: boolean;
  public isHeimmannschaftAnwesend: boolean;
  public isGastMannschaftAnwesend: boolean;
  public spielPlatz: number;
  public spielTyp: string;
  public gruppe: string;

  constructor() {
  }

  public static fromJson(json: any): Spiel {
    const spiel = new Spiel();
    spiel.id = json.id;
    spiel.gastMannschaft = Mannschaft.fromJSON(json.gastMannschaft);
    spiel.heimMannschaft = Mannschaft.fromJSON(json.heimMannschaft);
    spiel.heimTore = json.heimTore;
    spiel.gastTore = json.gastTore;
    spiel.hasHalftime = json.hasHalftime;
    spiel.halftimeDuration = this.numberFromDuration(json.halftimeDuration);

    //Date time auf UTC timezone ändern
    json.dateTime += "+00:00";

    spiel.dateTime = new Date(json.dateTime);
    spiel.isHeimmannschaftAnwesend = json.isHeimmannschaftAnwesend;
    spiel.isGastMannschaftAnwesend = json.isGastMannschaftAnwesend;
    spiel.isKampfgerichtAnwesend = json.isKampfgerichtAnwesend;
    spiel.isSchiedsrichterAnwesend = json.isSchiedsrichterAnwesend;
    spiel.spielPlatz = json.spielPlatz;
    spiel.spielTyp = json.spielTyp;
    spiel.gruppe = json.gruppe;

    return spiel;
  }

  private static numberFromDuration(duration: string): number {
    if (/^PT[0-9]+M$/.test(duration)) {
      // Format 'PT{Minuten}M' wenn spiel eine zeit in minuten dauerrt sonst null da wir nur eine Duration in minuten erwarten!
      duration.substring(2, duration.length - 1)
    } else {
      return 0;
    }
  }
}

