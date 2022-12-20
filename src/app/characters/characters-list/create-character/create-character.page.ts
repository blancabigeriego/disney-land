import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { CharactersService } from "../../characters.service";
import { ReactiveFormsModule } from "@angular/forms";
import { take } from "rxjs";

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

  constructor(
    private charactersService: CharactersService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      nameInput: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      filmsInput: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      shortFilmsInput: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      tvShowsInput: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      videoGamesInput: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      parkAttractionsInput: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      alliesInput: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      enemiesInput: new FormControl(null, {
        updateOn: "blur",
      }),
      imageInput: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
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
            console.log("que pasa?");
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(["tabs/characters"]);
          });
      });
  }
}
