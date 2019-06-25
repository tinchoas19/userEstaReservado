import { MyPopoverPage } from './../my-popover/my-popover';
import { EventosLocalPage } from './../eventos-local/eventos-local';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PerfilPage } from '../perfil/perfil';

declare var google : any;

@Component({
  selector: 'page-int-local',
  templateUrl: 'int-local.html',
})
export class IntLocalPage {

  @ViewChild('map') mapRef: ElementRef;
  private win: any = window;  
  info:any[];
  localName:any;
  visible:boolean=false;
  expanded:boolean=true;
  map: any;
  imgSrc:any;
  url:string = "http://estareservado.ctrlztest.com.ar/";
  horarios:any=[];
  data:boolean=false;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public popoverCtrl: PopoverController    
  ) {
    this.info = this.navParams.data;
    this.localName = this.info['nombre'];
    console.log('infoLocal', this.info);
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

  presentPopover(event) {
    const popover = this.popoverCtrl.create(MyPopoverPage,this.info, {showBackdrop: true, cssClass:"custom-popover"});
    popover.present({
      ev: event,
    });
  }

  editarPerfil(){
    this.navCtrl.push(PerfilPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntLocalPage');
    this.loadMap();
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

  goToEvents(){
    this.navCtrl.push(EventosLocalPage,this.info);
  }

  expandItem(horarios) {
    if(horarios.length == 0){
      this.data = true;
    }else{
      this.data = false;
      this.horarios = horarios.map(horario=>{
        switch (horario['dia']) {
          case "7":
            return {dia:"Domingo", desde:this.recortar(horario['horadesde']), hasta:this.recortar(horario['horahasta'])};
          case "1":
            return {dia:"Lunes", desde:this.recortar(horario['horadesde']), hasta:this.recortar(horario['horahasta'])};
          case "2":
            return {dia:"Martes", desde:this.recortar(horario['horadesde']), hasta:this.recortar(horario['horahasta'])};
          case "3":
            return {dia:"Miércoles", desde:this.recortar(horario['horadesde']), hasta:this.recortar(horario['horahasta'])};
          case "4":
            return {dia:"Jueves", desde:this.recortar(horario['horadesde']), hasta:this.recortar(horario['horahasta'])};
          case "5":
            return {dia:"Viernes", desde:this.recortar(horario['horadesde']), hasta:this.recortar(horario['horahasta'])};
          case "6":
            return {dia:"Sábados", desde:this.recortar(horario['horadesde']), hasta:this.recortar(horario['horahasta'])};
        }
      })
      console.log('horarios', this.horarios);
    }
    setTimeout(()=>{
      this.expanded = !this.expanded;
      this.visible = !this.visible;
    },100)
  }

  recortar(hora){
    let horasplit = hora.split(":");
    return horasplit[0]+":"+horasplit[1];
  }

  loadMap(){
    //create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');
    //Map options
    const options = {
      center: {lat: -34.397, lng: 150.644},
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      streetViewControl: true,
      disableDefaultUI: true,     
    }
    //create map
    this.map = new google.maps.Map(mapEle, options)
    
    var geocoder = new google.maps.Geocoder();
    var infowindow = new google.maps.InfoWindow();

    this.geocodeAddress(geocoder, this.map, infowindow);
  }

  geocodeAddress(geocoder, resultMap, infowindow){
    var address = this.info['direccion'];

    geocoder.geocode({'address': address}, (results,status)=>{
      if(status === 'OK'){
        resultMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultMap,
          position: results[0].geometry.location
        });
        infowindow.setContent(address);
        infowindow.open(resultMap, marker);
      }else{
        alert('Geocode was not successful for the following reason: ' + status);      
      }
    });
  }

  
}
