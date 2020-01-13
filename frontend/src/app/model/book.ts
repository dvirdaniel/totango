export class Book {
  private _id: string;
  private _title: string;
  private _description: string;
  private _iSBN: number;
  private _author: string;
  private _publicationDate: Date;
  private _genre: string;
  private _price: number;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get iSBN(): number {
    return this._iSBN;
  }

  set iSBN(value: number) {
    this._iSBN = value;
  }

  get author(): string {
    return this._author;
  }

  set author(value: string) {
    this._author = value;
  }

  get publicationDate(): Date {
    return this._publicationDate;
  }

  set publicationDate(value: Date) {
    this._publicationDate = value;
  }

  get genre(): string {
    return this._genre;
  }

  set genre(value: string) {
    this._genre = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }
}
