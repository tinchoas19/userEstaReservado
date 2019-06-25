import { Geolocation } from '@ionic-native/geolocation';
import { ServicesProvider } from './../../providers/services/services';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

declare var google : any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapRef: ElementRef;
  @ViewChild(Slides) slides: Slides;

  map: any;
  boliches:any=[];
  infoWindows: any =[];
  info : any;
  dogwalkMarker : any;
  slideOpts:any = {
    effect: 'flip'
  };
  num:number = 0;
  indexBol:number = 0;
  location:any={
    lat:"",
    lng:''
  }
  url:string = "http://estareservado.ctrlztest.com.ar/";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private service: ServicesProvider,
    private geo: Geolocation,
    private launchNavigator: LaunchNavigator
  ) {
  }

  slideChanged(){
    let currentIndex = this.slides.getActiveIndex();
    console.log('index', currentIndex);
  }
  
  ionViewDidLoad() {
    this.getCurrentPosition();    
  }

  setLocation(){
    var geocoder = new google.maps.Geocoder();
    this.boliches = this.service.localesMap;
    console.log('boliches', this.service.localesMap);
    this.boliches.map(x=>{
      x.index = this.num++;
      var address = x.direccion;
      geocoder.geocode({'address': address}, (results, status)=>{
        console.log('results', results);
        console.log('status', status);
        if(status === 'OK'){
          //this.map.setCenter(results[0].geometry.location);
          console.log('results',results);
          /* x.location['lat'] = results[0].geometry.location.lat();
          x.location['lng'] = results[0].geometry.location.lng(); */
          this.dogwalkMarker = new google.maps.Marker({
            draggable: false,
            animation: google.maps.Animation.DROP,
            position : results[0].geometry.location,
            icon: {
              url: this.url+x.foto,
              origin: new google.maps.Point(0, 0),
              size: new google.maps.Size(50, 50),
              scaledSize: new google.maps.Size(40, 40)
            },
            title: x.nombre,
            info: x,
            index: this.num,
          });
          this.num++;
        this.dogwalkMarker.setMap(this.map);
        this.addInfoWindowToMarker(this.dogwalkMarker);
      }else {
        console.log('Geocode was not successful for the following reason: ' + status);
      };
    })
    })
  }

  getCurrentPosition(){
    this.geo.getCurrentPosition().then(async (pos)=>{
      this.location.lat = pos.coords.latitude;
      this.location.lng = pos.coords.longitude;
      console.log('position', this.location);
      await this.loadMap(this.location);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  loadMap(location){
    //create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');
    //Map options
    const options = {
      center: location,
      zoom: 11,
      mapTypeId: 'terrain',
      streetViewControl: false,
      disableDefaultUI: false,
      fullscreenControl: false,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      rotateControl: false,     
    }

    //crete marker myposition
    var marker = new google.maps.Marker({
      position:location,
      map: this.map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      label: 'Yo!'
    })
    //create map
    this.map = new google.maps.Map(mapEle,options);
    marker.setMap(this.map);
    this.map.setCenter(location);
    this.setLocation();
  }

  //infoWindowMarkers
  addInfoWindowToMarker(marker){
    let infoMarker = marker['info'];    
    console.log('mark', marker);
    let infoWindowContent =
    "<div id=container style='color:#000;background-color:#fff;padding:5px;width:150px;'>"+
      "<h4 style='margin:0px'>"+marker.title+"</h4>"+
      "<hr />"+
        "<div id=imageInfo>"+
          "<img src="+marker.icon.url+">"+
        "</div>"+
      "<hr />"+
      "<button id=goToLocal>Detalle Local</button>"+
    "</div>";

    let infoWindow = new google.maps.InfoWindow({
      content : infoWindowContent,
      info: marker
    });

    google.maps.event.addListenerOnce(infoWindow,'domready', ()=>{
      //console.log('esteEs', infoWindow.info);
      this.info = infoWindow.info;

      document.getElementById('goToLocal').addEventListener('click', ()=>{
        const animationOptions = {
          animation : 'md-transition',
          duration: 1000,
        }
          //console.log('aqui',this.info);
          //this.navCtrl.push(InfoLocalPage, {info:this.info}, animationOptions);
      })
    })

    marker.addListener('click', ()=>{
      console.log('aquiiii', marker);
      this.boliches.filter(bol=>{
        if(bol['nombre'] === marker['title']){
          console.log('markerName', marker['title']);
          console.log('bol', bol);
          this.goToSlide(bol['index']);
        }
      })
      //console.log('nameBOL', nombreBol);
      this.closeAllInfoWindows();
      //infoWindow.open(this.map, marker)
    })
    this.infoWindows.push(infoWindow);
  }

  //cerrar infoWindow
  closeAllInfoWindows(){
    for(let window of this.infoWindows){
      window.close();
    }
  }

  goToSlide(index) {
    console.log(this.slides);
    this.slides.slideTo(index, 500);
  }

  goToLocal(local){
    console.log('local', local);
    /* let options: LaunchNavigatorOptions = {
      start: this.location,
      app: this.launchNavigator.APP.GOOGLE_MAPS,
    };*/
    this.launchNavigator.navigate(local['direccion']).then(success=>{
      console.log('success', success);
    }, error=>{
      console.log('error Launch', error);
    })
  }

}
