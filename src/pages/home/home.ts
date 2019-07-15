import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { IntLocalPage } from './../int-local/int-local';
import { ServicesProvider } from './../../providers/services/services';
import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, Events } from 'ionic-angular';
import { Content } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';

declare var google : any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  foto_perfil: boolean =false;
  @ViewChild('pageTop') pageTop: Content;
  private win: any = window;
  locales:any[];
  localesPrev:any=[];
  localesPrev2:any=[];
  infoLocales:any;
  location:any={
    lat:0,
    lng:0
  };
  imgSrc:any;
  hora_apertura:any;
  url:string = "http://estareservado.ctrlztest.com.ar/"

  constructor(
    public navCtrl: NavController,
    private services: ServicesProvider,
    private geo: Geolocation,
    public loadingCtrl : LoadingController,
    private storage: Storage,
    public events: Events,
  ) {
    //this.getLocales();
    //this.getCurrentPosition();
    this.imgSrc = 'assets/imgs/perfil-none.png';
    events.subscribe('home:scrollToTop', (time) => {
      console.log('home:scrollToTop', 'at', time);
      this.pageTop.scrollToTop();
    });
  }

  scrollToTop(){
    //scroll to page top
    console.log('scroll');
    this.pageTop.scrollToTop(600);
  }

  editarPerfil(){
    this.navCtrl.push(PerfilPage, {edit: true});
  }

  getTrustImg(){
    console.log('imgSrc', this.imgSrc);
    if(this.imgSrc != 'assets/imgs/perfil-none.png'){
      let path = this.win.Ionic.WebView.convertFileSrc(this.imgSrc);
      console.log(path);
      return path;
    }else{
      return this.imgSrc;
    }
  }

  mostrarFotoPerfil(){
    this.storage.get('photo_perfil').then(foto=>{
      console.log('foto', foto);
      if(foto){
        this.imgSrc = foto;
      }else{
        this.storage.get('fbId').then(id => {
          if(id != null){
            this.imgSrc = "https://graph.facebook.com/" + id + "/picture?type=large"
          }else{
            this.imgSrc = "assets/imgs/perfil-none.png";
          }
        })
      }
    });
  }

  onInput(ev:any){
    //console.log('entreeeeeeee' , ev.target.value);   
    const val = ev.target.value.trim();
    if (!(val == "")) {
      console.log('val',val);
      this.localesPrev2 = this.localesPrev2.filter((item) => {
        //console.log('itemSearch', item);
        return (item['nombre'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      //console.log(this.localesPrev2);
    }else {
      this.localesPrev2 = this.localesPrev;
    }
  }
  
  getCurrentPosition(){
    this.geo.getCurrentPosition().then(async (pos)=>{
      this.location.lat = pos.coords.latitude;
      this.location.lng = pos.coords.longitude;
      console.log('position', this.location);
      await this.getLocales();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  
  ionViewWillEnter(){
    console.log('imgSrc', this.imgSrc);
    this.getCurrentPosition();
    this.mostrarFotoPerfil();
  }

  getLocales(){
    let dia = new Date();
    let hoy = dia.getDay();
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Espere por favor...'
    });
    loading.present();
    this.services.getLocales().subscribe(x=>{
      this.scrollToTop();
      this.infoLocales = JSON.parse(x['_body'])['data'];
      this.localesPrev = JSON.parse(this.infoLocales)['stores'];
      this.localesPrev.map(x=>{
        if(x.horarios.length == 0){
          x.hora_apertura = "No abre hoy";
        }else{
          x.horarios.map(y=>{
            if(y.dia == hoy){
              x.hora_apertura = "Abre "+y.horadesde+" hrs"
            }
          })
        }
        x.distance = "Calculando...";
        var service = new google.maps.DistanceMatrixService;

        service.getDistanceMatrix({
          origins: [this.location],
          destinations: [x.direccion],
          travelMode: 'DRIVING',
          unitSystem : google.maps.UnitSystem.Metric,
          avoidHighways: false,
          avoidTolls: false
        }, async(response, status)=>{
          if (status !== 'OK'){
            alert('Error was: ' + status);
            x.distance =  "Nan";
          }else{
            //console.log('data',response)
            //console.log('respuesta', response['rows'][0]['elements'][0]['distance']['text']);
            x.distance = await response['rows'][0]['elements'][0]['distance']['text'];
            x.duration = await response['rows'][0]['elements'][0]['duration']['text'];
            x.distanceVal = await response['rows'][0]['elements'][0]['duration']['value'];
            //console.log('duration', x.duration);
          }
          setTimeout(()=>{
            this.ordenar();  
            loading.dismiss();
          },1000);
        });//Aca termina de resolver una distancia
      })
      this.services.localesMap = this.localesPrev;
      console.log(this.localesPrev);
    })

  }
  

  ordenar(){
    this.localesPrev2 = this.localesPrev.sort(function(a, b) {
      
      //console.log(a.nombre + " - "+ a.distance+ " - "+ b.nombre + " - "+b.distance+ "&")
      if(a.distanceVal > b.distanceVal){
        return 1
      }
      if(a.distanceVal < b.distanceVal){
        return -1
      }
      return 0
    });
  }
  

  goToIntLocal(local){
    console.log('local', local);
    this.navCtrl.push(IntLocalPage,local);
  }

}
