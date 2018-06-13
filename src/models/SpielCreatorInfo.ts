import {Jugend} from "./Jugend";

export class SpielCreatorInfo {
  public jugend: Jugend;
  public spielDuration: number;
  public pauseDuration: number;
  // Das datum wird am client als String gespeichert, da nie darauf zugegriffen werden muss
  // und es so leichter ist, diese mit dem richtigen format an den server zu schicken
  public turnierBeginn: string;
  public sechsMannschaftenGruppe: boolean;
  public spielPlatz: number;
}
