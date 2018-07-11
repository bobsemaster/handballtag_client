export class VerkaufArtikel {
  public id: number;
  public artikelName: string;
  public artikelPreis: number;
  public verkaufsplatz: string;

  constructor() {
    this.id = null;
  }

  public static fromJson(json: any): VerkaufArtikel {
    const artikel = new VerkaufArtikel();
    artikel.id = json.id;
    artikel.artikelName = json.artikelName;
    artikel.artikelPreis = json.artikelPreis;
    artikel.verkaufsplatz = json.verkaufsplatz;
    return artikel;
  }
}

export class Verkauf {
  public id: number;
  public verkaufArtikel: VerkaufArtikel[];
  public losverkaufGestartet: boolean;
  public preisvergabeGestartet: boolean;
  public grillAn: boolean;

  constructor() {
    this.id = null;
    this.verkaufArtikel = [];
    this.losverkaufGestartet = false;
    this.preisvergabeGestartet = false;
    this.grillAn = false;
  }

  public static fromJson(json: any): Verkauf {
    const verkauf = new Verkauf();
    verkauf.id = json.id;
    verkauf.grillAn = json.grillAn;
    verkauf.losverkaufGestartet = json.losverkaufGestartet;
    verkauf.preisvergabeGestartet = json.preisvergabeGestartet;
    verkauf.verkaufArtikel = [];

    if (!json.verkaufArtikel) {
      return verkauf;
    }
    for (const artikel of json.verkaufArtikel) {
      verkauf.verkaufArtikel.push(VerkaufArtikel.fromJson(artikel))
    }
    return verkauf;
  }
}
