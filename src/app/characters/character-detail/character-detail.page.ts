import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-character-detail",
  templateUrl: "./character-detail.page.html",
  styleUrls: ["./character-detail.page.scss"],
})
export class CharacterDetailPage implements OnInit {
  constructor(private router: Router, private navCtrl: NavController) {}

  ngOnInit() {}
  onUpdateCharacter() {
    this.navCtrl.navigateForward("tabs/characters");
  }
}
