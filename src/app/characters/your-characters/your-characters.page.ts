import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Subscription, switchMap, take } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { Character } from "../character.model";
import { CharactersService } from "../characters.service";

@Component({
  selector: "app-your-characters",
  templateUrl: "./your-characters.page.html",
  styleUrls: ["./your-characters.page.scss"],
})
export class YourCharactersPage implements OnInit {
  userCharacters: Character[];
  private characterSub: Subscription;
  isLoading = false;

  constructor(
    private http: HttpClient,
    private charactersService: CharactersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.characterSub = this.charactersService.userCharacters.subscribe(
      (characters) => {
        this.userCharacters = characters;
      }
    );
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.charactersService.fetchUserCharacters().subscribe(() => {
      this.isLoading = false;
    });
  }
}
