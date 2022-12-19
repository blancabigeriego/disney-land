import { Injectable } from "@angular/core";
import { Character } from "./character.model";

@Injectable({
  providedIn: "root",
})
export class CharactersService {
  private _characters: Character[] = [
    new Character(
      1,
      "Blancanieves",
      ["SnowWhite and the 7 dwarfs", "SnowWhite 2"],
      [],
      [],
      [],
      [],
      [],
      [],
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bbc.com%2Fmundo%2Fnoticias-60133458&psig=AOvVaw1fCffqaRt2JRyVMjjGajQT&ust=1671548168356000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCNjxqaX4hfwCFQAAAAAdAAAAABAE"
    ),
    new Character(
      1,
      "Simba",
      ["Lion King"],
      ["Lion King 2"],
      ["Timon and Pumbaa"],
      [],
      [],
      ["Timon"],
      [],
      "https://i.ebayimg.com/images/g/GBQAAOSwAYtWQJCk/s-l1600.jpg"
    ),
  ];

  get characters() {
    return [...this._characters];
  }
  constructor() {}
}
