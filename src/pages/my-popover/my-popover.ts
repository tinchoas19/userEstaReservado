import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-my-popover',
  templateUrl: 'my-popover.html',
})
export class MyPopoverPage {

  horarios:any=[];
  data:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPopoverPage');
  }

  ionViewWillEnter(){
    this.mostrarDia();
    console.log('harios', this.horarios);
  }


  mostrarDia(){
    if(this.navParams.data['horarios'].length == 0){
      this.data = true;
    }else{
      this.data = false;
      this.horarios = this.navParams.data['horarios'].map(horario=>{
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
  }

  recortar(hora){
    let horasplit = hora.split(":");
    return horasplit[0]+":"+horasplit[1];
  }

}
