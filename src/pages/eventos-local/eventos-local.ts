import { IntEventoPage } from './../int-evento/int-evento';
import { ServicesProvider } from './../../providers/services/services';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Content } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';

@Component({
  selector: 'page-eventos-local',
  templateUrl: 'eventos-local.html',
})
export class EventosLocalPage {
  @ViewChild('pageTop') pageTop: Content;
  private win: any = window;  
  info:any[];
  infoEventos:any=[];
  eventos:any=[];
  nombreLocal: any;
  direccion : string;
  listaFechas:any = [];
  mostrarmsj:boolean = false;
  imgSrc:any;
  url:string = "https://ctrlztest.com.ar/estareservado/";
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private services: ServicesProvider,
    public loadingCtrl : LoadingController,
    private storage: Storage,    
  ) {
    this.info = this.navParams.data;
    console.log('data', this.info);
    this.nombreLocal = this.info['nombre'];
    this.direccion = this.info['direccion'];
    this.getEventos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventosLocalPage');
  }

  pageScroller(){
    //scroll to page top
    this.pageTop.scrollToTop(500);
  }

  editarPerfil(){
    this.navCtrl.push(PerfilPage, {edit: true});
  }

  mostrarFotoPerfil(){
    this.storage.get('datauser').then(user=>{
      console.log('foto', user);
      let usuario = user[0];
      if(usuario.foto != ""){
        this.imgSrc = 'https://ctrlztest.com.ar/estareservado/'+usuario.foto;
      }else if(usuario.facabooid != null){
        this.imgSrc = "https://graph.facebook.com/" + usuario.facabooid + "/picture?type=large"
      }else{
        this.imgSrc = "assets/imgs/perfil-none.png";
      }
    });
  }

  ionViewWillEnter(){
    this.mostrarFotoPerfil();
  }

  getEventos(){
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Espere por favor...'
    });
    loading.present();
    this.services.getEventosLocal(this.info['id']).subscribe(x=>{
      this.infoEventos = JSON.parse(x['_body'])['data'];
      this.eventos = JSON.parse(this.infoEventos)['evento'];
      this.sinEventos(this.eventos);
      this.procesarLista();
      loading.dismiss();
      console.log('eventos',this.eventos);
    })
  }

  sinEventos(eventos){
    if(eventos.length === 0){
      this.mostrarmsj = true;
    }else{
      this.mostrarmsj = false;
    }  
  }

  procesarLista(){
    let fechaVieja = "";
    let items = {};
    items['listaEventos'] = [];
    this.eventos.map(x=>{
      console.log('e', x.fechaevento);
      if(x.fechaevento != fechaVieja){
        if(fechaVieja != ""){
          this.listaFechas.push(items);
          items = {};
          items['listaEventos'] = [];
        }
      }
        fechaVieja = x.fechaevento;
        items['fecha'] = fechaVieja;
        items['listaEventos'].push(x);
      console.log('item_vigente',items);
    })
    this.listaFechas.push(items);    
    console.log(this.listaFechas);
  }
   
  cortarCaracteres(frase){
    var resultado;
    if(frase.length >= 20){
      resultado = frase.substring(0, 20);
      return resultado +' ...';
    }else{
      resultado = frase;
      return resultado;
    }
  }

  dia(fecha){
    var day = fecha.split("-").reverse();
    return day[0]+'-'+day[1]+'-'+day[2];
  }

  goToIntEvent(evento){
    this.navCtrl.push(IntEventoPage,{event:evento, localName:this.nombreLocal});
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

}
