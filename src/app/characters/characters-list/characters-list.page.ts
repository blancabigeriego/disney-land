import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Character } from "../character.model";
import { CharactersService } from "../characters.service";

@Component({
  selector: "app-characters-list",
  templateUrl: "./characters-list.page.html",
  styleUrls: ["./characters-list.page.scss"],
})
export class CharactersListPage implements OnInit {
  loadedCharacters: Character[];
  private charactersSub: Subscription;
  constructor(private charactersService: CharactersService) {}
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.charactersSub = this.charactersService.characters.subscribe(
      (characters) => {
        this.isLoading = false;

        this.loadedCharacters = characters;
      }
    );
    console.log(this.loadedCharacters);
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.charactersService.fetchCharacters().subscribe(() => {
      this.isLoading = false;
    });
  }
}
