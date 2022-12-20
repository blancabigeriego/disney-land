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
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./characters-list/characters-list.module").then(
                (m) => m.CharactersListPageModule
              ),
          },
          {
            path: "create",
            loadChildren: () =>
              import(
                "./characters-list/create-character/create-character.module"
              ).then((m) => m.CreateCharacterPageModule),
          },
          {
            path: ":characterId",
            loadChildren: () =>
              import("./character-detail/character-detail.module").then(
                (m) => m.CharacterDetailPageModule
              ),
          },
          {
            path: "edit/:characterId",
            loadChildren: () =>
              import(
                "./characters-list/edit-character/edit-character.module"
              ).then((m) => m.EditCharacterPageModule),
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
          {
            path: ":characterId",
            loadChildren: () =>
              import("./character-detail/character-detail.module").then(
                (m) => m.CharacterDetailPageModule
              ),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/tabs/characters",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/tabs/characters",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharactersPageRoutingModule {}
