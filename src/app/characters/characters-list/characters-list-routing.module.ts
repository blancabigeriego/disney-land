import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CharactersListPage } from "./characters-list.page";

const routes: Routes = [
  {
    path: "",
    component: CharactersListPage,
  },
  {
    path: "create",
    loadChildren: () =>
      import("./create-character/create-character.module").then(
        (m) => m.CreateCharacterPageModule
      ),
  },
  {
    path: "edit/:characterId",
    loadChildren: () =>
      import("./edit-character/edit-character.module").then(
        (m) => m.EditCharacterPageModule
      ),
  },

  // {
  //   path: "character-detail",
  //   loadChildren: () =>
  //     import("../character-detail/character-detail.module").then(
  //       (m) => m.CharacterDetailPageModule
  //     ),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharactersListPageRoutingModule {}
