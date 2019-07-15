import { IntEventoPage } from './../int-evento/int-evento';
import { Storage } from '@ionic/storage';
import { QrDataPage } from './../qr-data/qr-data';
import { ServicesProvider } from './../../providers/services/services';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';


@Component({
  selector: 'page-reservas',
  templateUrl: 'reservas.html',
})
export class ReservasPage {
  listaFechas:any=[];
  listaFechasAnteriores: any =[];
  listaFechasVigentes: any =[];
  fechas: any =[];
  fechasAnt: any =[];
  createdCode = null;
  historicos:string= "vigentes";
  usuarioId:any;
  reservas : any= [];
  data : any =[];
  reservasVigentes:any=[];
  reservasAnteriores:any=[];
  mostrarmsj:boolean;
  mostrarmsj1:boolean;
  url:string = "http://estareservado.ctrlztest.com.ar/"
  seMostroInfo:boolean = true;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private services: ServicesProvider,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private storage: Storage,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservasPage');
  }

  ionViewWillEnter(){
    if(this.seMostroInfo){this.showAlert();}
    this.getReservas();    
  }

  createCode(id, reserva){
    this.navCtrl.push(QrDataPage, {qrid:id, qrReserva:reserva});
    /* console.log('i', index);
    this.createdCode = id; */
  }

  getReservas(){
    this.reservasAnteriores = [];
    this.reservasVigentes = [];
    this.listaFechasAnteriores = [];
    this.listaFechasVigentes = [];
    this.storage.get('userId').then(x=>{
      this.services.getReservasUser(x).subscribe(x=>{
        this.data = JSON.parse(x['_body'])['data'];
        this.reservas = JSON.parse(this.data)['reserva']
        console.log('reservas', this.reservas);
        this.reservas.map((reserva)=>{
          console.log('infoReserva', reserva);
          let hoy = new Date();
          let fechaEvento = new Date(reserva.fechaevento);
          console.log('hoy', hoy);
          console.log('fechaevento', fechaEvento);
          reserva.btnColor = this.colorBtn(reserva.estapago);
          reserva.nameBtn = this.nameBtn(reserva.estapago);
          if(hoy <= fechaEvento){
          console.log('entr1');            
            this.reservasVigentes.push(reserva);
          }else{
            console.log('entr2');                        
            this.reservasAnteriores.push(reserva);
          }
        })
        this.procesarListaAnteriores();
        this.procesarListaVigentes();
        this.listaFechasAnteriores.length == 0? this.mostrarmsj = true : this.mostrarmsj = false;
        this.listaFechasVigentes.length == 0? this.mostrarmsj1 = true : this.mostrarmsj1 = false;
        //console.log('reservas', Object.keys(this.listaFechasAnteriores[0]).length);
        console.log('reservaVigentes', this.reservasVigentes);
        console.log('reservaAnteriores', this.reservasAnteriores);        
      })
    })
  }

  mostrarDia(fecha){
    var day = fecha.split("-").reverse();
    return day[0]+'/'+day[1]+'/'+day[2];
  }

  dia(fecha){
    //console.log('fecha', fecha);
    var date = new Date(fecha);
    var dia =  date.getDay()+1 > 31? date.getDay() : date.getDay()+1 ;
    //console.log('date', date);
    //console.log('dia', dia);
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

  mostrarQR(e){
    let toast = this.toastCtrl.create({
      message: 'MUESTRA EL QR',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();

    /* this.scanner.encode(this.scanner.Encode.TEXT_TYPE, e)
      .then((data)=>{
        this.encodedData = data;
      }, (err)=>{
        console.log('Error', err);
      }) */
  }

  colorBtn(data){
    if(data === "0"){
      return "primary"
    }else{
      return "secondary"
    }
  }

  internaEvento(res){
    console.log(res);
    this.navCtrl.push(IntEventoPage, {event:res});
  }

  nameBtn(data){
    if(data==="1"){
      return "Pago";
    }else{
      return "Reservado";
    } 
  }

  procesarListaAnteriores(){
    this.listaFechasAnteriores = [];
    let fechaVieja = "";
    let items = {};
    items['listaEventos'] = [];
    this.reservasAnteriores.map(x=>{
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
    this.listaFechasAnteriores.push(items);    
    console.log(this.listaFechas);
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: '¡No pierdas tiempo!',
      subTitle: '¡Apreta el botón "Reservado" y asccedé al código QR de tus entradas!\n ER, simple, rápido y seguro.',
      buttons: [
        {
        text: 'Ok',
        handler: data => {
          this.seMostroInfo = false;
          console.log('OK clicked');
          }
        }
      ]
    });
    alert.present();
  }

  procesarListaVigentes(){
    this.listaFechasVigentes = [];
    let fechaVieja = "";
    let items = {};
    items['listaEventos'] = [];
    this.reservasVigentes.map(x=>{
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
    this.listaFechasVigentes.push(items);    
    console.log(this.listaFechas);
  }


}
