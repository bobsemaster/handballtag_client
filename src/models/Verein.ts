export class Verein {

  public id: number;
  public name: string;


  public constructor(name: string) {
    this.name = name;
    this.id = null;
  }

  public static fromJSON(json: any): Verein {
    const verein = new Verein(json.name);
    verein.id = json.id;
    return verein
  }

}
