import { ServicesProvider } from './../../providers/services/services';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-change-pass',
  templateUrl: 'change-pass.html',
})
export class ChangePassPage {
  email:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastController: ToastController,
    private services: ServicesProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePassPage');
  }

  emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  recuperarPass(email){
    console.log('email', email);
    if (this.emailIsValid(this.email)) {
      this.services.recuperarPass(email).subscribe(x=>{
        console.log('data',x);
        let data = JSON.parse(x['_body']);
        if(data['status'] == 200){
          let msg = 'Listo! \n Te enviamos un email a tu casilla.'
          this.presentToasteEx(msg)
          setTimeout(()=>{
            this.navCtrl.pop();
          },1000)
        }else{
          let msg = "Oh no! \n Por favor verifica que sea un email válido, o no estas registrado."
          this.presentToasteError(msg);
          setTimeout(()=>{
            this.navCtrl.pop();
          },1000)
        }
      }, onerror=>{
        let msg = "Oh no! \n Por favor verifica que sea un email válido, o no estas registrado."
        this.presentToasteError(msg);
        setTimeout(()=>{
          this.navCtrl.pop();
        },1000)
      })
    }else{
      let msg = "Oh no! \n Por favor verifica que sea un email válido, o no estas registrado."
      this.presentToasteError(msg);
    }
  }

  async presentToasteError(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration:2000,
      showCloseButton: true,
      position: 'top',
      cssClass: 'toastError',
      closeButtonText: 'x'
    });
    toast.present();
  }

  async presentToasteEx(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration:2000,
      showCloseButton: true,
      position: 'top',
      cssClass: 'toastExito',
      closeButtonText: 'x'
    });
    toast.present();
  }

}
