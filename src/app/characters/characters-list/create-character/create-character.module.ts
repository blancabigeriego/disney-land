import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CreateCharacterPage } from "./create-character.page";
import { CreateCharacterPageRoutingModule } from "./create-character-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateCharacterPageRoutingModule,
  ],
  declarations: [CreateCharacterPage],
})
export class CreateCharacterPageModule {}
