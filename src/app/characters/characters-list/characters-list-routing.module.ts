import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CharactersListPage } from "./characters-list.page";

const routes: Routes = [
  {
    path: "",
    component: CharactersListPage,
  },

  {
    path: "character-detail",
    loadChildren: () =>
      import("./character-detail/character-detail.module").then(
        (m) => m.CharacterDetailPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharactersListPageRoutingModule {}
