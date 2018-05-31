export class Jugend {

  public typ: JugendGenderEnum;
  public jahrgang: JugendEnum;

  public functionTest() {
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

  private stringHashCode(string: string): number {
    let hash = 0, i, chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
      chr = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  public hashCode(): number {
    return this.stringHashCode(this.typ.toString()) + this.stringHashCode(this.jahrgang.toString());
  }


  public toJSON(): any {
    const json: any = {};
    switch (this.typ) {
      case JugendGenderEnum.GEMISCHT:
        json.typ = "GEMISCHT";
        break;
      case JugendGenderEnum.MAENNLICH:
        json.typ = "MAENNLICH";
        break;
      case JugendGenderEnum.WEIBLICH:
        json.typ = "WEIBLICH";
        break;
    }
    switch (this.jahrgang) {
      case JugendEnum.AJUGEND:
        json.jahrgang = "AJUGEND";
        break;
      case JugendEnum.BJUGEND:
        json.jahrgang = "BJUGEND";
        break;
      case JugendEnum.CJUGEND:
        json.jahrgang = "EJUGEND";
        break;
      case JugendEnum.DJUGEND:
        json.jahrgang = "DJUGEND";
        break;
      case JugendEnum.EJUGEND:
        json.jahrgang = "EJUGEND";
        break;
      case JugendEnum.MINIS:
        json.jahrgang = "MINIS";
        break;
    }
    return json;
  }
}


export enum JugendGenderEnum {
  MAENNLICH = "Männlich",
  WEIBLICH = "Weiblich",
  GEMISCHT = "Gemischt",

}

export enum JugendEnum {
  MINIS = "Minis",
  EJUGEND = "E-Jugend",
  DJUGEND = "D-Jugend",
  CJUGEND = "C-Jugend",
  BJUGEND = "B-Jugend",
  AJUGEND = "A-Jugend"
}




