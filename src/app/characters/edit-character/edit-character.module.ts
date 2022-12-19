import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCharacterPageRoutingModule } from './edit-character-routing.module';

import { EditCharacterPage } from './edit-character.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCharacterPageRoutingModule
  ],
  declarations: [EditCharacterPage]
})
export class EditCharacterPageModule {}
