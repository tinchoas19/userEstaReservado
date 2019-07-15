import { Deeplinks } from '@ionic-native/deeplinks';
import { TabsPage } from './../pages/tabs/tabs';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { InfoSlidePage } from '../pages/info-slide/info-slide';
import { Storage } from '@ionic/storage';
import { ConfirmPage } from '../pages/confirm/confirm';

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
      storage.get('dataUsuario').then((val)=>{
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

  // ngAfterViewInit() {
  //   console.log("pagina a renderizar",this.nav.name);
    
  //   this.platform.ready().then(() => {
  //     this.deeplink.routeWithNavController(this.nav, {
  //       "/comprasuccess": this.rootPage = ConfirmPage,
  //     });
  //   });
  // }

  /* ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.Deeplinks
        .rourouteWithNavControllerte({
          "/comprasuccess": ConfirmPage,
        }
          //   "/bought": BoughtPage,
          //   '/products/:productId': ProductPage
        )
        // Desde la web se envia a: goopzer://redefinepass?usuarioid=marta@ctrlz.com.ar
 
        // Desde la web se envia a: goopzer://redefinepass?usuarioid=marta@ctrlz.com.ar&?password=12345678
 
        .subscribe(
          match => {
            //  match.$route // - the route we matched, which is the matched entry from the arguments to route()
            // match.$args - the args passed in the link
            // match.$link - the full link data
            console.log("Successfully matched route", match);
          },
          nomatch => {
            // nomatch.$link - the full link data
            console.error("Got a deeplink that didn't match", nomatch);
          }
        );
    });
  } */
}

