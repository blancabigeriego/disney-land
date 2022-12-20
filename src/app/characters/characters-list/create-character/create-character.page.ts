import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { CharactersService } from "../../characters.service";

// function base64toBlob(base64Data: string, contentType: string) {
//   contentType = contentType || "";
//   const sliceSize = 1024;
//   const byteCharacters = atob(base64Data);
//   const bytesLength = byteCharacters.length;
//   const slicesCount = Math.ceil(bytesLength / sliceSize);
//   const byteArrays = new Array(slicesCount);

//   for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
//     const begin = sliceIndex * sliceSize;
//     const end = Math.min(begin + sliceSize, bytesLength);

//     const bytes = new Array(end - begin);
//     for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
//       bytes[i] = byteCharacters[offset].charCodeAt(0);
//     }
//     byteArrays[sliceIndex] = new Uint8Array(bytes);
//   }
//   return new Blob(byteArrays, { type: contentType });
// }

@Component({
  selector: "app-create-character",
  templateUrl: "./create-character.page.html",
  styleUrls: ["./create-character.page.scss"],
})
export class CreateCharacterPage implements OnInit {
  form: FormGroup;
  nameInput: FormControl;
  filmsInput: FormControl;
  shortFilmsInput: FormControl;
  tvShowsInput: FormControl;
  videoGamesInput: FormControl;
  parkAttractionsInput: FormControl;
  alliesInput: FormControl;
  enemiesInput: FormControl;
  imageInput: FormControl;

  constructor(
    private charactersService: CharactersService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.nameInput = new FormControl("", [Validators.required]);
    this.filmsInput = new FormControl("", [Validators.required]);
    this.shortFilmsInput = this.nameInput = new FormControl("", [
      Validators.required,
    ]);
    this.videoGamesInput = this.nameInput = new FormControl("", [
      Validators.required,
    ]);
    this.parkAttractionsInput = this.nameInput = new FormControl("", [
      Validators.required,
    ]);
    this.alliesInput = this.nameInput = new FormControl("", [
      Validators.required,
    ]);
    this.enemiesInput = this.nameInput = new FormControl("");
    this.imageInput = this.nameInput = new FormControl("", [
      Validators.required,
    ]);

    this.form = new FormGroup({
      name: this.nameInput,
      films: this.filmsInput,
      shortFilms: this.shortFilmsInput,
      tvShows: this.tvShowsInput,
      videoGames: this.videoGamesInput,
      parkAttractions: this.parkAttractionsInput,
      allies: this.alliesInput,
      enemies: this.enemiesInput,
      image: this.imageInput,
    });
  }

  onCreateChar() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: "Even miracles take a little time...",
      })
      .then((loadingEl) => {
        loadingEl.present();

        return this.charactersService
          .addCharacter(
            this.form.value.name,
            this.form.value.films,
            this.form.value.shortFilms,
            this.form.value.tvShows,
            this.form.value.videoGames,
            this.form.value.parkAttractions,
            this.form.value.allies,
            this.form.value.enemies,
            this.form.value.imageUrl
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(["tabs/characters"]);
          });
      });
  }
}
