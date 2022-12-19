import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "landing",
    loadChildren: () =>
      import("./landing/landing/landing.component").then(
        (m) => m.LandingComponent
      ),
  },
  {
    path: "",
    redirectTo: "landing",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
