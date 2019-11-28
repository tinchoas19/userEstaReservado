import { ChangePassPage } from './../change-pass/change-pass';
import { TabsPage } from './../tabs/tabs';
import { PerfilPage } from './../perfil/perfil';
import { InfoSlidePage } from './../info-slide/info-slide';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { Storage } from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user:any={
    usuario:'',
    password:''
  }
  msgError:string='';
  data:any=[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl : LoadingController,
    private service: ServicesProvider,
    public fb: Facebook,
    private storage: Storage 
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    if(this.validacion()){
      const loader = this.loadingCtrl.create({
        content: "Espere por favor...",
      });
      loader.present();
      this.service.validarUser(this.user).subscribe(x=>{
        console.log('vuetaUser',x);
        this.data = JSON.parse(x['_body']);
        if(this.data['data']['usuarioid'] != 0){
          //guarda usuarioid
          console.log('login',this.data['data']);
          this.storage.set('datauser',this.data['data']);
          loader.dismiss();          
          setTimeout(()=>{
            this.navCtrl.setRoot(InfoSlidePage);
            //this.toastExito()
          },500)
        }else{
          this.msgError = "Oh no! \n Ocurrio un error, prueba nuevamente y verifica correctamente los pasos."
          this.user.usuario = "";
          this.user.password = "";
          this.toastError();
        }
      })
    }else{
      this.toastError()
    }
  }
  
  emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  validacion() {
    let ret = true;
    let msg = "";
    if (!this.emailIsValid(this.user.usuario) || this.user.usuario == "") {
      ret = false;
      msg += "Oh no! \n Ocurrio un error, prueba nuevamente y verifica correctamente los pasos.";
    }
    if (this.user.password == "") {
      ret = false;
      msg += "Debe completar la contraseña \n";
    }
    this.msgError = msg;
    return ret;
  }

  toastExito() {
    let toast = this.toastCtrl.create({
      message: 'Bienvenido a EstáReservado!',
      duration: 2000,
      position: 'top',
      cssClass: 'toastExito'
    });
    toast.present();
  }

  toastError() {
    let toast = this.toastCtrl.create({
      message: this.msgError,
      showCloseButton: true,
      closeButtonText: "X",
      duration: 3000,
      position: 'top',
      cssClass: 'toastError'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  //login with Facebook
  loginAction() {
    //permissions
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        console.log('res', res);
        if (res.status == "connected") {
          //Get user ID an Token
          var fb_id = res.authResponse.userID;
          this.storage.set('fbId', fb_id);
          var fb_token = res.authResponse.accessToken;
          console.log('id and toke', fb_id, fb_token);

          //Get user infos from the API
          this.fb.api("/me?fields=name,email", [])
            .then((user) => {
              console.log('userFB', user);
              var name = user.name;
              var nameUser = name.split(" ")[0];
              var email = user.email;
              if (email != "") {
                //this.storage.set('emailFB', email);
                let loading = this.loadingCtrl.create({
                  spinner: 'bubbles',
                  content: 'Espere por favor...'
                });
                this.service.validarFbId(fb_id).subscribe(x=>{
                  console.log('vueltaApiFB',JSON.parse(x['_body']));
                  this.data = JSON.parse(x['_body']);
                  if(this.data['data']['usuarioid'] === 0){
                    loading.dismiss();                    
                    this.navCtrl.push(PerfilPage, {fbId:fb_id, name: nameUser, email:email})
                  }else{
                    this.storage.set('userId',this.data['data']['usuarioid']);
                    loading.dismiss();                    
                    this.navCtrl.setRoot(TabsPage)
                  }      
                })
              }
            });
        } else {
          //error ocurred while loging-in
          console.log("Error ocurred")
        }
      })
      .catch((error) => {
        console.log('Error logging into Facebook', error);
      });
  }

  crearCuenta(){
    this.navCtrl.push(PerfilPage, {register: true});
  }

  recuperarPass(){
    this.navCtrl.push(ChangePassPage);
  }

}
