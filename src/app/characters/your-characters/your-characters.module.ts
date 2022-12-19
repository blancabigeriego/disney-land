import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YourCharactersPageRoutingModule } from './your-characters-routing.module';

import { YourCharactersPage } from './your-characters.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YourCharactersPageRoutingModule
  ],
  declarations: [YourCharactersPage]
})
export class YourCharactersPageModule {}
