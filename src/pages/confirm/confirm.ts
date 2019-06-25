import { ReservasPage } from './../reservas/reservas';
import { Component } from '@angular/core';
import { NavController, NavParams, Nav, Tabs } from 'ionic-angular';


@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {
  tab: any;
  constructor(
    public navCtrl: NavController,
    private nav: Nav,
    public navParams: NavParams
  ) {
    this.tab = this.navCtrl.parent;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
    setTimeout(()=>{
      this.tab.select(0);
    },3000)
  }

}
