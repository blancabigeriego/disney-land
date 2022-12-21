import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  NavController,
} from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { switchMap, take } from "rxjs/operators";
import { Character } from "../character.model";
import { CharactersService } from "../characters.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-character-detail",
  templateUrl: "./character-detail.page.html",
  styleUrls: ["./character-detail.page.scss"],
})
export class CharacterDetailPage implements OnInit {
  character: Character;
  isLoading = false;
  private characterSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private charactersService: CharactersService,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("characterId")) {
        this.navCtrl.navigateBack("/tabs/characters");
        return;
      }
      this.isLoading = true;
      this.characterSub = this.charactersService
        .getCharacter(paramMap.get("characterId") as string)
        .subscribe((character) => {
          this.character = character;
          this.isLoading = false;
        });
    });
  }
  onDeleteCharacter(charId: string) {
    this.loadingCtrl
      .create({
        message: "Deleting...",
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.charactersService.deleteCharacter(charId).subscribe(() => {
          loadingEl.dismiss();
          this.router.navigateByUrl("tabs/characters");
        });
      });
  }

  ngOnDestroy() {}
}
