import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PerfilPage } from '../perfil/perfil';

@Component({
  selector: 'page-qr-data',
  templateUrl: 'qr-data.html',
})
export class QrDataPage {

  private win: any = window;
  createdCode:any = null;
  reservaInfo:any;
  imgSrc:any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,    
  ) {
    this.createdCode = this.navParams.data['qrid'];
    this.reservaInfo = this.navParams.data['qrReserva'];
  }

  editarPerfil(){
    this.navCtrl.push(PerfilPage, {edit: true});
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
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad QrDataPage');
  }

  ionViewWillEnter(){
    this.mostrarFotoPerfil();
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

}
