import { Component, OnInit } from "@angular/core";
import { Character } from "../character.model";
import { CharactersService } from "../characters.service";

@Component({
  selector: "app-characters-list",
  templateUrl: "./characters-list.page.html",
  styleUrls: ["./characters-list.page.scss"],
})
export class CharactersListPage implements OnInit {
  loadedCharacters: Character[];
  constructor(private charactersService: CharactersService) {}

  ngOnInit() {
    this.loadedCharacters = this.charactersService.characters;
  }
}
