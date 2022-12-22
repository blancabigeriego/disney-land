import { NgModule } from "@angular/core";

import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "landing",
    pathMatch: "full",
  },
  {
    path: "landing",
    loadChildren: () =>
      import("./landing/landing.module").then((m) => m.LandingPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: "tabs",
    loadChildren: () =>
      import("./characters/characters.module").then(
        (m) => m.CharactersPageModule
      ),
    canLoad: [AuthGuard],
  },

  {
    path: "auth",
    loadChildren: () =>
      import("./auth/auth.module").then((m) => m.AuthPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
