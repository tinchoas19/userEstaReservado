import { TabsPage } from './../tabs/tabs';
//import { PerfilPage } from './../perfil/perfil';
//import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'page-info-slide',
  templateUrl: 'info-slide.html',
})
export class InfoSlidePage {
  @ViewChild(Slides) slides: Slides;
  muestraBtn:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoSlidePage');
  }

  goToHome(){
    this.navCtrl.setRoot(TabsPage);
  }

  slideChanged(){
    if(this.slides.isEnd()){
      this.muestraBtn = true;
    }else{
      this.muestraBtn = false;
    }
  }

}
