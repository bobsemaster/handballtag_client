export class Jugend {

  public typ: JugendGender;
  public jahrgang: JugendEnum;

  public static fromJson(json: any): Jugend {
    const jugend = new Jugend();
    jugend.typ = json.typ;
    jugend.jahrgang = json.jahrgang;
    return jugend;
  }
}

export enum JugendGender {
  MAENNLICH,
  WEIBLICH,
  GEMISCHT
}

export enum JugendEnum {
  MINIS,
  EJUGEND,
  DJUGEND,
  CJUGEND,
  BJUGEND,
  AJUGEND
}
