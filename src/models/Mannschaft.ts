import {Verein} from "./Verein";
import {Pair} from "./Pair";
import {Jugend} from "./Jugend";

export class Mannschaft {
  public id: number;
  public name: String;
  public verein: Verein;
  public torverhaeltnis: Pair<number, number>;
  public punkteverhaeltnis: Pair<number, number>;
  public jugend: Jugend;
  public hasFoto: boolean;
  public tabellenPlatz: number;
  public gruppe: number;

  constructor() {
    this.id = null;
    this.hasFoto = false;
    this.gruppe = 0;
    this.torverhaeltnis = new Pair<number, number>(0, 0);
    this.punkteverhaeltnis = new Pair<number, number>(0, 0);
    this.tabellenPlatz = 0;
  }

  public static fromJSON(json: any) {
    const mannschaft = new Mannschaft();

    return mannschaft;
  }
}
