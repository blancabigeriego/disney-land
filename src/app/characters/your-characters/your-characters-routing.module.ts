import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { YourCharactersPage } from "./your-characters.page";

const routes: Routes = [
  {
    path: "",
    component: YourCharactersPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourCharactersPageRoutingModule {}
