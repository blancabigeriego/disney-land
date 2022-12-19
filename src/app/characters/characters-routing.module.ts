import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CharactersPage } from "./characters.page";

const routes: Routes = [
  {
    path: "",
    component: CharactersPage,
    children: [
      {
        path: "characters",
        loadChildren: () =>
          import("./characters-list/characters-list.module").then(
            (m) => m.CharactersListPageModule
          ),
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
      {
        path: ":characterId",
        loadChildren: () =>
          import(
            "./characters-list/character-detail/character-detail.module"
          ).then((m) => m.CharacterDetailPageModule),
      },
    ],
  },

  {
    path: "your-characters",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./your-characters/your-characters.module").then(
            (m) => m.YourCharactersPageModule
          ),
      },
    ],
  },
  {
    path: "",
    redirectTo: "/landing/tabs/characters",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharactersPageRoutingModule {}
