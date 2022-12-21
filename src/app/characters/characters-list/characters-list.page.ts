import { Component, OnInit } from "@angular/core";
import { IonItemSliding, LoadingController } from "@ionic/angular";
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
  constructor(
    private charactersService: CharactersService,
    private loadingCtrl: LoadingController
  ) {}
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
  onEdit(charId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
  }

  onDeleteCharacter(charId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.loadingCtrl
      .create({
        message: "Deleting...",
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.charactersService.deleteCharacter(charId).subscribe(() => {
          loadingEl.dismiss();
        });
      });
  }
}
