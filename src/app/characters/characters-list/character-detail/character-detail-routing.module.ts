import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateCharacterPage } from "../../create-character/create-character.page";
import { EditCharacterPage } from "../../edit-character/edit-character.page";

import { CharacterDetailPage } from "./character-detail.page";

const routes: Routes = [
  {
    path: "",
    component: CharacterDetailPage,
  },

  { path: "edit", component: EditCharacterPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterDetailPageRoutingModule {}
