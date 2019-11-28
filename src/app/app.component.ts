import { Deeplinks } from '@ionic-native/deeplinks';
import { TabsPage } from './../pages/tabs/tabs';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public storage: Storage,
    public deeplink: Deeplinks
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.overlaysWebView(true);
      statusBar.backgroundColorByHexString('#259ea6')
      //statusBar.styleDefault();
      splashScreen.hide();
      storage.get('datauser').then((val)=>{
        console.log('componentApp', val);
        if(val){
          this.rootPage = TabsPage
          //this.nav.setRoot(TabsPage);
        }else{
          this.rootPage = LoginPage;
        }
      })
    });
  }
}

