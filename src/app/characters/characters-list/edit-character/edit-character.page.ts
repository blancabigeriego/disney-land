import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AlertController,
  LoadingController,
  NavController,
} from "@ionic/angular";
import { Subscription, take } from "rxjs";
import { Character } from "../../character.model";
import { CharactersService } from "../../characters.service";
@Component({
  selector: "app-edit-character",
  templateUrl: "./edit-character.page.html",
  styleUrls: ["./edit-character.page.scss"],
})
export class EditCharacterPage implements OnInit, OnDestroy {
  character: Character;
  form: FormGroup;
  isLoading = false;
  characterId: string | null;
  charactersSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private characterService: CharactersService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("characterId")) {
        this.navCtrl.navigateBack("/tabs/characters");
        return;
      }
      this.characterId = paramMap.get("characterId");
      this.isLoading = true;

      this.charactersSub = this.characterService
        .getCharacter(paramMap.get("characterId") as string)
        .subscribe(
          (character) => {
            this.character = character;
            this.form = new FormGroup({
              nameInput: new FormControl(this.character.name, {
                updateOn: "blur",
                validators: [Validators.required],
              }),
              filmsInput: new FormControl(this.character.films, {
                updateOn: "blur",
                validators: [Validators.required],
              }),
              shortFilmsInput: new FormControl(this.character.shortFilms, {
                updateOn: "blur",
                validators: [Validators.required],
              }),
              tvShowsInput: new FormControl(this.character.tvShows, {
                updateOn: "blur",
                validators: [Validators.required],
              }),
              videoGamesInput: new FormControl(this.character.videoGames, {
                updateOn: "blur",
                validators: [Validators.required],
              }),
              parkAttractionsInput: new FormControl(
                this.character.parkAttractions,
                {
                  updateOn: "blur",
                  validators: [Validators.required],
                }
              ),
              alliesInput: new FormControl(this.character.allies, {
                updateOn: "blur",
                validators: [Validators.required],
              }),
              enemiesInput: new FormControl(this.character.enemies, {
                updateOn: "blur",
                validators: [Validators.required],
              }),
              imageInput: new FormControl(this.character.imageUrl, {
                updateOn: "blur",
                validators: [Validators.required],
              }),
            });
            this.isLoading = false;
          },
          (error) => {
            this.alertCtrl
              .create({
                header: "An error occured",
                message:
                  "Character could not be fetched. Please try again later",
                buttons: [
                  {
                    text: "Okey",
                    handler: () => {
                      if (this.router.url.includes("/your-characters")) {
                        this.router.navigate(["tabs/your-characters"]);
                      } else {
                        this.router.navigate(["tabs/characters"]);
                      }
                    },
                  },
                ],
              })
              .then((alertEl) => {
                alertEl.present();
              });
          }
        );
    });
  }

  onUpdateCharacter() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: "Updating character...",
      })
      .then((loadingEl) => {
        loadingEl.present();
        console.log(this.form.value);
        this.characterService

          .updateCharacter(
            this.character.id,
            this.form.value.nameInput,
            this.form.value.filmsInput,
            this.form.value.shortFilmsInput,
            this.form.value.tvShowsInput,
            this.form.value.videoGamesInput,
            this.form.value.parkAttractionsInput,
            this.form.value.alliesInput,
            this.form.value.enemiesInput,
            this.form.value.imageInput
          )
          .pipe(take(1))
          .subscribe(() => {
            console.log(this.form.value);
            loadingEl.dismiss();
            this.form.reset();
            if (this.router.url.includes("/your-characters")) {
              this.router.navigate(["tabs/your-characters"]);
            } else {
              this.router.navigate(["tabs/characters"]);
            }
          });
      });
  }

  onCancel() {
    if (this.router.url.includes("/your-characters")) {
      this.router.navigate(["tabs/your-characters"]);
    } else {
      this.router.navigateByUrl("tabs/characters");
    }
  }
  ngOnDestroy() {
    if (this.charactersSub) {
      this.charactersSub.unsubscribe();
    }
  }
}
