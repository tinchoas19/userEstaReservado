import { ServicesProvider } from './../../providers/services/services';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ConfirmReservaPage } from '../confirm-reserva/confirm-reserva';
import { Storage } from '@ionic/storage';
import { PerfilPage } from '../perfil/perfil';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

@Component({
  selector: 'page-int-evento',
  templateUrl: 'int-evento.html',
})
export class IntEventoPage {
  private win: any = window;
  options: InAppBrowserOptions = {
    location: "yes", //Or 'no'
    hidden: "yes", //Or  'yes'
    clearcache: "yes",
    clearsessioncache: "yes",
    zoom: "yes", //Android only ,shows browser zoom controls
    hardwareback: "yes",
    mediaPlaybackRequiresUserAction: "no",
    shouldPauseOnSuspend: "no", //Android only
    closebuttoncaption: "Close", //iOS only
    disallowoverscroll: "no", //iOS only
    toolbar: "yes", //iOS only
    enableViewportScale: "no", //iOS only
    allowInlineMediaPlayback: "no", //iOS only
    presentationstyle: "pagesheet", //iOS only
    fullscreen: "yes" //Windows only
  };

  nombreLocal:any;
  usuarioId:any;
  info:any=[];
  dataUser:any=[];
  imgSrc:any;
  url:string = "http://estareservado.ctrlztest.com.ar/"
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private services: ServicesProvider,
    public loadingCtrl : LoadingController,
    private iab:InAppBrowser,
    private storage: Storage,    
  ) {
    this.nombreLocal = this.navParams.data.localName;
    this.info = this.navParams.data.event;
    console.log('info', this.info);
  }

  getTrustImg(){
    if(this.imgSrc != 'assets/imgs/perfil-none.png'){
      let path = this.win.Ionic.WebView.convertFileSrc(this.imgSrc);
      console.log(path);
      return path;
    }else{
      return this.imgSrc;
    }
  }

  editarPerfil(){
    this.navCtrl.push(PerfilPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntEventoPage');
  }

  ionViewWillEnter(){
    this.valor = this.info['precio'];
    this.storage.get('userId').then(x =>{
      console.log('userId', x);
      if(x){
        this.usuarioId = x;
      }
      this.mostrarFotoPerfil();
      this.getDataUser();   
    })
  }

  mostrarFotoPerfil(){
    this.storage.get('photo_perfil').then(foto=>{
      if(foto){
        this.imgSrc = foto;
      }else{
        this.storage.get('fbId').then(id => {
          if(id != null){
            this.imgSrc = "https://graph.facebook.com/" + id + "/picture?type=large&width=90&height=90"
          }else{
            this.imgSrc = "../../assets/imgs/perfil-none.png";
          }
        })
      }
    });
  }

  getDataUser(){
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Espere por favor...'
    });
    loading.present();
    this.services.getDataUser(this.usuarioId).subscribe(x=>{
      this.dataUser = JSON.parse(x['_body'])['data'];
      loading.dismiss();
      console.log('xxxx', this.dataUser);
    })
  }

  dia(fecha){
    var day = fecha.split("-").reverse();
    return day[0]+'/'+day[1]+'/'+day[2];
  }

  validarBtn(info){
    let date = new Date();
    let dateEvento = new Date(info.fechaevento);
    if(date > dateEvento){
      return false;
    }else{
      return true;
    }
  }

  mostrarDia(fecha){
    var date = new Date(fecha);
    var dia =  date.getDay()+1 > 31? date.getDay() : date.getDay()+1 ;
    var day;
    switch (dia) {
      case 7:
          day = "Domingo";
          break;
      case 1:
          day = "Lunes";
          break;
      case 2:
          day = "Martes";
          break;
      case 3:
          day = "Miércoles";
          break;
      case 4:
          day = "Jueves";
          break;
      case 5:
          day = "Viernes";
          break;
      case 6:
          day = "Sábado";
    }
    return day
  }

  goToReserva(){
    this.navCtrl.push(ConfirmReservaPage,this.info);
  }

  // ***********************************************************
 // ---------------- CIFRADO DE CHECKOUT
 // ***********************************************************

 web: string = "http://ctrlztest.com.ar/test-mercadopago/?";

 price: string = btoa("price=");
 valor: any;
 urlMP:any;
 priceAgain: string = "NgUhtRF";

 idWord: string = "ID";
 idNumber: string = "zLRTC";

 checkout() {
   // let money: string = btoa(JSON.stringify(this.valor));
   // let moneyAgain: string = btoa(JSON.stringify(this.valor));

   let money: any = btoa(this.valor);
   let moneyAgain: any = btoa(this.valor);

   this.urlMP=
     this.web +
       this.price +
       "LzY63" +
       money +
       "&" +
       this.priceAgain +
       "LzY63" +
       moneyAgain +
       "&" +
       this.idWord +
       "LzY63" +
       this.idNumber,
     "_blank",
     "location=yes";

     let target = "_blank";
     this.iab.create(this.urlMP, target, this.options);
 }

 /* public openWithSystemBrowser(url: string) {
   let target = "_system";
   this.iab.create(url, target, this.options);
 }
 public openWithInAppBrowser(url: string) {
   let target = "_blank";
   this.iab.create(url, target, this.options);
 }
 public openWithCordovaBrowser(url: string) {
   let target = "_self";
   this.iab.create(url, target, this.options);
 } */

}
