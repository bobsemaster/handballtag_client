export class Jugend {

  public typ: JugendGenderEnum;
  public jahrgang: JugendEnum;

  public functionTest(){
    console.log("test");
  }

  public static fromJson(json: any): Jugend {
    const jugend = new Jugend();

    switch (json.typ) {
      case "MAENNLICH":
        jugend.typ = JugendGenderEnum.MAENNLICH;
        break;
      case "WEIBLICH":
        jugend.typ = JugendGenderEnum.WEIBLICH;
        break;
      case "GEMISCHT":
        jugend.typ = JugendGenderEnum.GEMISCHT;
        break;
      case "Männlich":
        jugend.typ = JugendGenderEnum.MAENNLICH;
        break;
      case "Weiblich":
        jugend.typ = JugendGenderEnum.WEIBLICH;
        break;
      case "Gemischt":
        jugend.typ = JugendGenderEnum.GEMISCHT;
        break;
      default:
        console.error("Der jugend typ: " + json.typ + " existiert nicht!");
    }
    switch (json.jahrgang) {
      case "MINIS":
        jugend.jahrgang = JugendEnum.MINIS;
        break;
      case "EJUGEND":
        jugend.jahrgang = JugendEnum.EJUGEND;
        break;
      case "DJUGEND":
        jugend.jahrgang = JugendEnum.DJUGEND;
        break;
      case "CJUGEND":
        jugend.jahrgang = JugendEnum.CJUGEND;
        break;
      case "BJUGEND":
        jugend.jahrgang = JugendEnum.BJUGEND;
        break;
      case "AJUGEND":
        jugend.jahrgang = JugendEnum.AJUGEND;
        break;
      case "Minis":
        jugend.jahrgang = JugendEnum.MINIS;
        break;
      case "E-Jugend":
        jugend.jahrgang = JugendEnum.EJUGEND;
        break;
      case "D-Jugend":
        jugend.jahrgang = JugendEnum.DJUGEND;
        break;
      case "C-Jugend":
        jugend.jahrgang = JugendEnum.CJUGEND;
        break;
      case "B-Jugend":
        jugend.jahrgang = JugendEnum.BJUGEND;
        break;
      case "A-Jugend":
        jugend.jahrgang = JugendEnum.AJUGEND;
        break;
      default:
        console.error("Es existiert keine Jugend: " + json.jahrgang);
    }

    return jugend;
  }
}


export enum JugendGenderEnum {
  MAENNLICH = "Männlich",
  WEIBLICH = "Weiblich",
  GEMISCHT = "Gemischt"
}

export enum JugendEnum {
  MINIS = "Minis",
  EJUGEND = "E-Jugend",
  DJUGEND = "D-Jugend",
  CJUGEND = "C-Jugend",
  BJUGEND = "B-Jugend",
  AJUGEND = "A-Jugend"
}
