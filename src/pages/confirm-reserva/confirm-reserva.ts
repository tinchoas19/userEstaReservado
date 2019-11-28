import { Storage } from '@ionic/storage';
import { ServicesProvider } from './../../providers/services/services';
import { ConfirmPage } from './../confirm/confirm';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-confirm-reserva',
  templateUrl: 'confirm-reserva.html',
})
export class ConfirmReservaPage {

  info:any=[];
  userId:any;
  data:any=[];
  msg:any;
  url:string = "https://ctrlztest.com.ar/estareservado/"

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,  
    private services: ServicesProvider,
    private storage: Storage,
  ) {
    this.info = this.navParams.data;
    console.log('data', this.info);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmReservaPage');
  }

  ionViewWillEnter(){
    this.info = this.navParams.data;
    this.storage.get('datauser').then(x=>{
      let usuario = x[0];
      this.userId = usuario.usuarioid;
    })
  }

  goToConfirmacion(){
    this.navCtrl.push(ConfirmPage);  
  }

  crearReserva(){
    const loader = this.loadingCtrl.create({
      content: "Espere por favor...",
    });
    loader.present();
    this.services.crearReserva(this.userId, this.info['id'], 0).subscribe((x=>{
      console.log('vueltaRecervaCreada',x);
      this.data = JSON.parse(x['_body']);
      if(this.data['data'] == 'inserted'){
        loader.dismiss();
        this.toastExito();
        setTimeout(()=>{
          this.navCtrl.push(ConfirmPage);
        },1000)
      }else{
        this.msg = "Oh no! \n Ya reservaste este evento!"
        this.toastError();
      }
    }))
  }

  toastExito() {
    let toast = this.toastCtrl.create({
      message: 'Listo! \n Realizaste la reserva con éxito!',
      duration: 2000,
      position: 'top',
      cssClass: 'toastExito'
    });
    toast.present();
  }

  toastError() {
    let toast = this.toastCtrl.create({
      message: this.msg,
      showCloseButton: true,
      closeButtonText: "X",
      duration: 5000,
      position: 'top',
      cssClass: 'toastError'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

}
