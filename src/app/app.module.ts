import { TerminosPage } from './../pages/terminos/terminos';
import { MyPopoverPage } from './../pages/my-popover/my-popover';
import { ChangePassPage } from './../pages/change-pass/change-pass';
import { ConfirmReservaPage } from './../pages/confirm-reserva/confirm-reserva';
import { IntEventoPage } from './../pages/int-evento/int-evento';
import { IntLocalPage } from './../pages/int-local/int-local';
import { ReservasPage } from './../pages/reservas/reservas';
import { MapPage } from './../pages/map/map';
import { LoginPage } from './../pages/login/login';
import { InfoSlidePage } from './../pages/info-slide/info-slide';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PerfilPage } from '../pages/perfil/perfil';
import { TabsPage } from '../pages/tabs/tabs';
import { ServicesProvider } from '../providers/services/services';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { EventosLocalPage } from '../pages/eventos-local/eventos-local';
import { ConfirmPage } from '../pages/confirm/confirm';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { QrDataPage } from '../pages/qr-data/qr-data';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { Camera } from "@ionic-native/camera";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Crop } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64';
import { ImagePicker } from '@ionic-native/image-picker';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InfoSlidePage,
    LoginPage,
    PerfilPage,
    TabsPage,
    MapPage,
    ReservasPage,
    IntLocalPage,
    EventosLocalPage,
    IntEventoPage,
    ConfirmReservaPage,
    ConfirmPage,
    QrDataPage,
    ChangePassPage,
    MyPopoverPage,
    TerminosPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      backButtonIcon: 'md-arrow-back',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition'
    }),
    IonicStorageModule.forRoot(),
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InfoSlidePage,
    LoginPage,
    PerfilPage,
    TabsPage,
    MapPage,
    ReservasPage,
    IntLocalPage,
    EventosLocalPage,
    IntEventoPage,
    ConfirmReservaPage,
    ConfirmPage,
    QrDataPage,
    ChangePassPage,
    MyPopoverPage,
    TerminosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    LaunchNavigator,
    Facebook,
    Camera,
    ImagePicker,
    Crop,
    Base64,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesProvider
  ]
})
export class AppModule {}
