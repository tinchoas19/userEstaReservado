import { LoginPage } from './../login/login';
import { TerminosPage } from './../terminos/terminos';
import { Storage } from '@ionic/storage';
import { ServicesProvider } from './../../providers/services/services';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, App, Nav, MenuController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Camera } from '@ionic-native/camera';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { InfoSlidePage } from '../info-slide/info-slide';
import { Platform } from 'ionic-angular';
import { Crop } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  registerForm = new FormGroup({});
  email: string | boolean;
  public formMail: any;
  private win: any = window;
  user: any = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    dni: '',
    nacimiento: '',
    pass: '',
    repetirPass: '',
  }
  userName: string = "";
  userEmail: string = "";
  apellido: string;
  showMsgError: boolean = false;
  msgError: string = "";
  data: any = [];
  fbId: any;
  cambioBtn1: boolean = false;
  cambioBtn2: boolean = false;
  cambioBtn3: boolean = false;
  imgSrc: any ="assets/imgs/perfil-none.png";
  dataUsuario: any = [];
  base64Image: any;
  perfil_photo:boolean = false;
  checkTerminos:boolean=false;
  @ViewChild(Nav) nav;
  imagePath:any;
  foto_perfil:boolean =false;
  fotoFace:boolean=false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private service: ServicesProvider,
    public menuCtrl: MenuController,
    public app: App,
    private _formBuilder: FormBuilder,
    private storage: Storage,
    public platform: Platform,
    public crop: Crop,
    private base64: Base64,
    private sanitizer: DomSanitizer,
    private camera: Camera,
    public picker: ImagePicker,
  ) {
    this.imagePath = 'assets/imgs/perfil-none.png';
  }

  getTrustImg(){
    console.log('fn_muestra', this.imagePath);
    if(this.imagePath != 'assets/imgs/perfil-none.png'){
      let path = this.win.Ionic.WebView.convertFileSrc(this.imagePath);
      console.log('fn_muestra_path',path);
      return path;
    }else{
      return this.imagePath;
    }
  }

  cropPicture(path){
    console.log('path_crop', path);
    let option={
      quality: 100,
      targetHeight: 100,
      targetWidth: 100
    };

    this.crop.crop(path, option).then(newImageCrop=>{
     this.imagePath = newImageCrop;
     console.log('imagen_cropeanda', newImageCrop);
     this.toBase64(newImageCrop);
    },error=>{
      console.log('error_Crop', error );
    })
  }

  ngOnInit() {
    this.formMail = this._formBuilder.group({
      clientEmail: [
        "",
        [
          Validators.required,
          Validators.pattern("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")
        ]
      ]
    });
  }

  ionViewWillEnter() {
    console.log('dataUser',this.navParams.data);
    this.cambioBtn1 = this.cambioBtn2 = this.cambioBtn3 = false;
    this.mostrarFotoPerfil();
    let params = this.navParams.data;
    if(params.register){
      console.log('0');
      this.cambioBtn1 = true;
      this.cambioBtn2 = this.cambioBtn3=false;
    }else if(params.fbId){
      this.storage.set('fbId', this.fbId);
      this.userName = this.user.nombre = this.navParams.data['name'];
      this.userEmail = this.user.email = this.navParams.data['email'];
      this.cambioBtn1 = false;
      this.cambioBtn2 = true;
      this.cambioBtn3= false;
    }else if(params.edit){
      console.log('3')
      this.getDataUser();      
      this.cambioBtn1 = this.cambioBtn2 = false;
      this.cambioBtn3 = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  changeName(e) {
    this.userName = this.user.nombre.charAt(0).toUpperCase() + this.user.nombre.slice(1);
  }

  changeLastName(e) {
    this.apellido = this.user.apellido.charAt(0).toUpperCase() + this.user.apellido.slice(1);
  }

  changeEmail(e) {
    this.userEmail = this.user.email.toLowerCase();
  }

  mostrarFotoPerfil(){
    this.fotoFace=false;
    this.foto_perfil = false;
    this.imgSrc = "";
    this.imagePath = "";
    if(this.navParams.data.register){
      console.log('1');      
      this.imagePath = "assets/imgs/perfil-none.png";
      this.toBase64(this.imgSrc);
    }else if(this.navParams.data.edit){
      console.log('2');      
      this.foto_perfil = true;
      this.storage.get('photo_perfil').then(foto=>{
        if(foto){
          this.imagePath = foto;
        }
      })
    }else if(this.navParams.data['fbId']){
      console.log('3');
      this.fotoFace = true;
      //this.foto_perfil = false;
      let idFace = this.navParams.data['fbId'];
      this.imagePath = "https://graph.facebook.com/" +idFace+ "/picture?type=large&width=90&height=90";
      this.toBase64(this.imagePath);      
    }
  }

  sevePerfilconFb() {
    if (this.validacion()) {
      this.storage.set('dataUser', this.user);
      this.service.createUserFB(this.user, this.fbId, this.base64Image).subscribe(x => {
        console.log('dataCreateUser', JSON.parse(x['_body']));
        this.storage.set('photo_perfil', this.imagePath);        
        this.data = JSON.parse(x['_body']);
        if (this.data['data']) {
          this.storage.set('userId', this.data['data']);
          this.dataUsuario = [];
          this.toastExito()
          setTimeout(() => {
            this.navCtrl.setRoot(InfoSlidePage);
          }, 1500)
        } else {
          this.msgError = 'Hubo un error, vuelve a intentarlo mas tarde por favor!';
          this.toastError();
        }
      })
    } else {
      this.toastError();
    }
  }

  emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  actualizarUser(){
    //this.validacion();
    this.storage.get('userId').then(id=>{
      console.log('id', id);
      if(id && this.validacion()){
        this.service.updateUser(id, this.user, this.base64Image).subscribe(x => {
          this.storage.set('photo_perfil', this.imagePath);          
          console.log('dataCreateUser', JSON.parse(x['_body']));
          this.data = JSON.parse(x['_body'])['data']; 
          if (this.data) {
            this.toastExito()
            setTimeout(() => {
              this.navCtrl.pop();
            }, 1000)
          }else {
            this.msgError = 'Oh no! \n Hubo un error, vuelve a intentarlo más tarde por favor!';
            this.toastError();
          }
        })
      }else{
        this.toastError();
      }
    })
  }

  savePerfil() {
    console.log('user', this.user);
    if (this.validacion()) {
      this.storage.set('dataUser', this.user);
      this.service.createUser(this.user, this.base64Image).subscribe(x => {
        console.log('dataCreateUser', JSON.parse(x['_body']));
        this.storage.set('photo_perfil', this.base64Image);
        this.data = JSON.parse(x['_body']);
        if (this.data['data']) {
          this.storage.set('userId', this.data['data']);
          this.toastExito()
          this.dataUsuario = [];
          setTimeout(() => {
            this.navCtrl.setRoot(InfoSlidePage);
          }, 1500)
        } else {
          this.msgError = 'Oh no! \n Hubo un error, vuelve a intentarlo más tarde por favor!';
          this.toastError();
        }
      })
    } else {
      this.toastError();
    }
    //this.navCtrl.push(TabsPage);
  }

  selected(event){
    this.checkTerminos = !this.checkTerminos;
  }

  addPerfilPhoto(){
    const options = {
      mediaType: this.camera.MediaType.ALLMEDIA,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      allowEdit: true,
    };

    this.camera.getPicture(options)
    .then((fileUri) => {
      console.log('fileUri_camara', fileUri);
      // Crop Image, on android this returns something like, '/storage/emulated/0/Android/...'
      // Only giving an android example as ionic-native camera has built in cropping ability
      if (this.platform.is('ios')) {
        return fileUri
      } else if (this.platform.is('android')) {
        // Modify fileUri format, may not always be necessary
        fileUri = 'file://' + fileUri;

        /* Using cordova-plugin-crop starts here */
        this.cropPicture(fileUri);
      }
    })
  }

  toBase64(filePath) {
    this.base64.encodeFile(filePath).then((base64File: string) => {
      this.base64Image = base64File;
      this.foto_perfil = true;
    });
  }

  validacion() {
    let ret = true;
    let msg = this.msgError = "";
    if (this.user.nombre == "") {
      ret = false;
      msg += "Debe completar el nombre \n";
    }
    if (this.user.apellido == "") {
      ret = false;
      msg += "Debe completar el apellido \n";
    }
    if (!this.emailIsValid(this.user.email)) {
      ret = false;
      msg += "Debe completar un email correcto \n";
    }
    if (this.user.pass == "") {
      ret = false;
      msg += "Debe completar el password \n";
    }
    if (this.user.repetirPass == "") {
      ret = false;
      msg += "Debe completar el password \n";
    }
    if (this.user.repetirPass !== this.user.pass) {
      ret = false;
      msg += "Deben coincidir las contraseñas \n";
    }
    if (this.user.telefono == "") {
      ret = false;
      msg += "Debe ingresar un número de telefono válido \n";
    }
    if (this.user.dni == "" || this.user.dni.length != 8) {
      ret = false;
      msg += "Debes ingresar un DNI correcto \n";
    }
    if (this.user.nacimiento == "") {
      ret = false;
      msg += "Debe completar la fecha de nacimiento \n";
    }else {
      var ageDifMs = Date.now() - new Date(this.user.nacimiento).getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      var edad = Math.abs(ageDate.getUTCFullYear() - 1970);
      if (edad < 16) {
        ret = false;
        msg += "Debe ser mayor de 16 años para utilizar EstáReservado. \n";
      }
    }
    this.msgError = msg;
    return ret;
  }

  toastExito() {
    let toast = this.toastCtrl.create({
      message: 'Listo! \n Los cambios han sido guardados',
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
      duration: 2000,
      position: 'top',
      cssClass: 'toastError'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  getDataUser() {
    this.storage.get('userId').then((id) => {
      console.log('idUser', id);
      this.service.getDataUser(id).subscribe(data => {
        console.log('dataUsuario', JSON.parse(data['_body']));
        this.dataUsuario = JSON.parse(data['_body'])['data'];
        this.storage.set('dataUsuario', this.dataUsuario);
        this.cambioBtn3 = true;
        this.userName = this.user.nombre = this.dataUsuario['name'].charAt(0).toUpperCase() + this.dataUsuario['name'].slice(1);
        this.userEmail = this.user.email = this.dataUsuario['email'];
        this.user.apellido = this.apellido = this.dataUsuario['surname'].charAt(0).toUpperCase() + this.dataUsuario['surname'].slice(1);
        this.user.telefono = this.dataUsuario['phone'];
        this.user.dni = this.dataUsuario['dni'];
        this.user.nacimiento = this.dataUsuario['birthdate'];
        this.user.pass = this.user.repetirPass = this.dataUsuario['password'];
        this.cambioBtn1 = false;
      })
    })
  }

  goToTerminos() {
    this.navCtrl.push(TerminosPage);
  }

  logOut() {
    this.storage.set('userId', false);
    this.storage.set('dataUsuario', false);
    this.storage.set('fbId', false);
    this.menuCtrl.close();
    var nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
  }

}
