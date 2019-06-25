import { TabsPage } from './../pages/tabs/tabs';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { InfoSlidePage } from '../pages/info-slide/info-slide';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav;
  rootPage:any;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    storage: Storage,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.overlaysWebView(true);
      statusBar.backgroundColorByHexString('#259ea6')
      //statusBar.styleDefault();
      splashScreen.hide();
      storage.get('dataUsuario').then((val)=>{
        if(val != 0){
          this.rootPage = TabsPage
          //this.nav.setRoot(TabsPage);
        }else{
          this.rootPage = LoginPage;
        }
      })
    });
  }
}

