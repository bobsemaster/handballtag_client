export class VerkaufArtikel {
  public id: number;
  public artikelName: string;
  public artikelPreis: number;
  public verkaufsplatz: string;

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
  public isLosVerkaufGestartet: boolean;
  public isPreisvergabeGestartet: boolean;
  public isGrillAn: boolean;


  public static fromJson(json: any): Verkauf {
    const verkauf = new Verkauf();
    verkauf.id = json.id;
    verkauf.isGrillAn = json.isGrillAn;
    verkauf.isLosVerkaufGestartet = json.isLosVerkaufGestartet;
    verkauf.isPreisvergabeGestartet = json.isPreisvergabeGestartet;

    if (!json.verkaufArtikel) {
      return verkauf;
    }
    for (const artikel of json.verkaufArtikel) {
      verkauf.verkaufArtikel.push(VerkaufArtikel.fromJson(artikel))
    }
  }
}
