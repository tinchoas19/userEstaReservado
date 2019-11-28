import { LoginPage } from './../login/login';
import { TerminosPage } from './../terminos/terminos';
import { Storage } from '@ionic/storage';
import { ServicesProvider } from './../../providers/services/services';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, App, Nav, MenuController, LoadingController } from 'ionic-angular';
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
    facebookid:''
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
  imgSrc: any = "assets/imgs/perfil-none.png";
  dataUsuario: any = [];
  base64Image: any = null;
  perfil_photo: boolean = false;
  checkTerminos: boolean = false;
  @ViewChild(Nav) nav;
  imagePath: any;
  foto_perfil: boolean = false;
  fotoFace: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private service: ServicesProvider,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
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
    this.imagePath = null;
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
    console.log('dataUser', this.navParams.data);
    this.cambioBtn1 = this.cambioBtn2 = this.cambioBtn3 = false;
    this.mostrarFotoPerfil();
    let params = this.navParams.data;
    if (params.register) {
      console.log('0');
      this.cambioBtn1 = true;
      this.cambioBtn2 = this.cambioBtn3 = false;
    } else if (params.fbId) {
      this.user.facebookid = params.fbId;
      this.userName = this.user.nombre = this.navParams.data['name'];
      this.userEmail = this.user.email = this.navParams.data['email'];
      this.cambioBtn1 = this.cambioBtn3 = false;
      this.cambioBtn2 = true;
    } else if (params.edit) {
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

  mostrarFotoPerfil() {
    this.fotoFace = false;
    this.foto_perfil = false;
    this.imgSrc = "";
    this.imagePath = "";
    if (this.navParams.data.register) {
      this.fotoFace = false;
      this.foto_perfil = false;
      console.log('1');
      this.imagePath = null;
    } else if (this.navParams.data.edit) {
      console.log('2');
      this.foto_perfil = true;
      this.storage.get('datauser').then(user => {
        let usuario = user[0];
        if (usuario.foto != null) {
          this.imagePath = 'https://ctrlztest.com.ar/estareservado/' + usuario.foto;
        }else if(usuario.facebookid != ""){
          this.imagePath = "https://graph.facebook.com/" + usuario.facebookid + "/picture?type=large&width=90&height=90";
        }else{
          this.imagePath = false;
        }
      })
    } else if (this.navParams.data['fbId']) {
      this.user.facebookid = this.navParams.data['fbId'];
      console.log('3');
      this.fotoFace = true;
      this.foto_perfil = true;
      let idFace = this.navParams.data['fbId'];
      this.imagePath = "https://graph.facebook.com/" + idFace + "/picture?type=large&width=90&height=90";
    }
  }

  sevePerfilconFb() {
    if (this.validacion()) {
      const loader = this.loadingCtrl.create({
        content: "Espere por favor...",
      });
      loader.present();
      this.service.createUserFB(this.user, this.user.facebookid).subscribe(x => {
        console.log('dataCreateUser', JSON.parse(x['_body']));
        this.data = JSON.parse(x['_body']);
        if (this.data['data']) {
          this.storage.set('datauser', this.data['data']);
          this.dataUsuario = [];
          this.toastExito();
          loader.dismiss();
          setTimeout(() => {
            this.navCtrl.setRoot(InfoSlidePage);
          }, 1500)
        } else {
          this.msgError = 'Hubo un error, vuelve a intentarlo mas tarde por favor!';
          loader.dismiss();
          this.toastError();
        }
      })
    } else {
      this.toastError();
    }
  }

  emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  actualizarUser() {
    //this.validacion();
    this.storage.get('userId').then(id => {
      console.log('id', id);
      if (id && this.validacion()) {
        const loader = this.loadingCtrl.create({
          content: "Espere por favor...",
        });
        loader.present();
        this.service.updateUser(id, this.user, this.imagePath).subscribe(x => {
          this.storage.set('photo_perfil', this.imagePath);
          console.log('dataCreateUser', JSON.parse(x['_body']));
          this.data = JSON.parse(x['_body'])['data'];
          if (this.data) {
            this.storage.set('datauser', this.data['data']);
            this.toastExito();
            loader.dismiss();
            setTimeout(() => {
              this.navCtrl.pop();
            }, 1000)
          } else {
            this.msgError = 'Oh no! \n Hubo un error, vuelve a intentarlo más tarde por favor!';
            loader.dismiss();
            this.toastError();
          }
        })
      } else {
        this.toastError();
      }
    })
  }

  savePerfil() {
    console.log('user', this.user);
    if (this.validacion()) {
      const loader = this.loadingCtrl.create({
        content: "Espere por favor...",
      });
      loader.present();
      this.service.createUser(this.user, this.imagePath).subscribe(x => {
        console.log('dataCreateUser', JSON.parse(x['_body']));
        this.data = JSON.parse(x['_body']);
        if (this.data['data']) {
          this.storage.set('datauser', this.data['data']);
          this.toastExito();
          loader.dismiss();
          this.dataUsuario = [];
          setTimeout(() => {
            this.navCtrl.setRoot(InfoSlidePage);
          }, 1500)
        } else {
          this.msgError = 'Oh no! \n Hubo un error, vuelve a intentarlo más tarde por favor!';
          loader.dismiss();
          this.toastError();
        }
      })
    } else {
      this.toastError();
    }
    //this.navCtrl.push(TabsPage);
  }

  selected(event) {
    this.checkTerminos = !this.checkTerminos;
  }

  addPerfilPhoto() {
    const options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: 0,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true
    };

    this.camera.getPicture(options)
      .then((imageData) => {
        console.log('imageData_camara', imageData);
        // Crop Image, on android this returns something like, '/storage/emulated/0/Android/...'
        // Only giving an android example as ionic-native camera has built in cropping ability
        this.imagePath = 'data:image/jpeg;base64,' + imageData;
        //this.toBase64(this.imagePath);
      })
  }

  /* getTrustImg() {
    console.log('fn_muestra', this.imagePath);
    if (this.imagePath != "assets/imgs/perfil-none.png") {
      let path = this.win.Ionic.WebView.convertFileSrc(this.imagePath);
      console.log('fn_muestra_path', path);
      return path;
    } else {
      return this.imagePath;
    }
  }

  cropPicture(path) {
    console.log('path_crop', path);
    let option = {
      quality: 100,
      targetHeight: 100,
      targetWidth: 100
    };

    this.crop.crop(path, option).then(newImageCrop => {
      this.imagePath = newImageCrop;
      console.log('imagen_cropeanda', newImageCrop);
    }, error => {
      console.log('error_Crop', error);
    })
  } */


  toBase64(filePath) {
    this.base64.encodeFile(filePath).then((base64File: string) => {
      this.base64Image = base64File;
      //this.imagenes.push(this.base64Image);
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
    } else {
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
    this.storage.get('datauser').then((user) => {
      let usuario = user[0];
      console.log('idUser', usuario.usuarioid);
      this.service.getDataUser(usuario.usuarioid).subscribe(data => {
        console.log('dataUsuario', JSON.parse(data['_body']));
        this.dataUsuario = JSON.parse(data['_body'])['data'];
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
    this.storage.set('userId', null);
    this.storage.set('dataUsuario', null);
    this.storage.set('fbId', null);
    this.storage.set('usuario', null);
    this.menuCtrl.close();
    var nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
  }

}
