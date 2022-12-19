import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CharactersPage } from "../characters/characters.page";

import { LandingPage } from "./landing.page";

const routes: Routes = [
  {
    path: "",
    component: LandingPage,
  },
  {
    path: "tabs",
    component: CharactersPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
