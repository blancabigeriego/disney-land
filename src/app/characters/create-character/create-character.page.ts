import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { switchMap } from "rxjs";
import { CharactersService } from "../characters.service";

function base64toBlob(base64Data, contentType) {
  contentType = contentType || "";
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

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
      name: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      films: new FormGroup(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      shortFilms: new FormGroup(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      tvShows: new FormGroup(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      videoGames: new FormGroup(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      parkAttractions: new FormGroup(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      allies: new FormGroup(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      enemies: new FormGroup(null, {
        updateOn: "blur",
      }),
    });
  }

  onCreateChar() {
    if (!this.form.valid || !this.form.get("image").value) {
      return;
    }
    this.loadingCtrl
      .create({
        message: "Even miracles take a little time",
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.charactersService
          .uploadImage(this.form.get("image").value)
          .pipe(
            switchMap((uploadResponse) => {
              return this.charactersService.addCharacter(
                this.form.value.name,
                this.form.value.films,
                this.form.value.shortFilms,
                this.form.value.tvShows,
                this.form.value.videoGames,
                this.form.value.parkAttractions,
                this.form.value.allies,
                this.form.value.enemies,
                uploadResponse.imageUrl
              );
            })
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(["tabs/characters"]);
          });
      });

      onImagePicked(imageData: string | File) {
        let imageFile;
        if (typeof imageData === "string") {
          try {
            imageFile = base64toBlob(
              imageData.replace("data:image/jpeg;base64,", ""),
              "image/jpg"
            );
          } catch (error) {
            console.log(error);
            return;
          }
        } else {
          imageFile = imageData;
        }
    
        this.form.patchValue({ image: imageFile });
        console.log(this.form.value);
      }
  }
}
