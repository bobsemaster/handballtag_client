export class Pair<A, B> {
  public first: A;
  public second: B;


  constructor(first: A, second: B) {
    this.first = first;
    this.second = second;
  }

  public static fromJson<A, B>(json: any): Pair<A, B> {
    return new Pair<A, B>(json.first, json.second);
  }
}
