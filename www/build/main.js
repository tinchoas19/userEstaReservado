webpackJsonp([0],{

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntEventoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_services_services__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__confirm_reserva_confirm_reserva__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__perfil_perfil__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_in_app_browser__ = __webpack_require__(226);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var IntEventoPage = /** @class */ (function () {
    function IntEventoPage(navCtrl, navParams, services, loadingCtrl, iab, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.services = services;
        this.loadingCtrl = loadingCtrl;
        this.iab = iab;
        this.storage = storage;
        this.win = window;
        this.options = {
            location: "yes",
            hidden: "yes",
            clearcache: "yes",
            clearsessioncache: "yes",
            zoom: "yes",
            hardwareback: "yes",
            mediaPlaybackRequiresUserAction: "no",
            shouldPauseOnSuspend: "no",
            closebuttoncaption: "Close",
            disallowoverscroll: "no",
            toolbar: "yes",
            enableViewportScale: "no",
            allowInlineMediaPlayback: "no",
            presentationstyle: "pagesheet",
            fullscreen: "yes" //Windows only
        };
        this.info = [];
        this.dataUser = [];
        this.url = "http://estareservado.ctrlztest.com.ar/";
        // ***********************************************************
        // ---------------- CIFRADO DE CHECKOUT
        // ***********************************************************
        this.web = "http://ctrlztest.com.ar/test-mercadopago/?";
        this.price = btoa("price=");
        this.priceAgain = "NgUhtRF";
        this.idWord = "ID";
        this.idNumber = "zLRTC";
        this.nombreLocal = this.navParams.data.localName;
        this.info = this.navParams.data.event;
        console.log('info', this.info);
    }
    IntEventoPage.prototype.getTrustImg = function () {
        if (this.imgSrc != 'assets/imgs/perfil-none.png') {
            var path = this.win.Ionic.WebView.convertFileSrc(this.imgSrc);
            console.log(path);
            return path;
        }
        else {
            return this.imgSrc;
        }
    };
    IntEventoPage.prototype.editarPerfil = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__perfil_perfil__["a" /* PerfilPage */]);
    };
    IntEventoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IntEventoPage');
    };
    IntEventoPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.valor = this.info['precio'];
        this.storage.get('userId').then(function (x) {
            console.log('userId', x);
            if (x) {
                _this.usuarioId = x;
            }
            _this.mostrarFotoPerfil();
            _this.getDataUser();
        });
    };
    IntEventoPage.prototype.mostrarFotoPerfil = function () {
        var _this = this;
        this.storage.get('photo_perfil').then(function (foto) {
            if (foto) {
                _this.imgSrc = foto;
            }
            else {
                _this.storage.get('fbId').then(function (id) {
                    if (id != null) {
                        _this.imgSrc = "https://graph.facebook.com/" + id + "/picture?type=large&width=90&height=90";
                    }
                    else {
                        _this.imgSrc = "../../assets/imgs/perfil-none.png";
                    }
                });
            }
        });
    };
    IntEventoPage.prototype.getDataUser = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Espere por favor...'
        });
        loading.present();
        this.services.getDataUser(this.usuarioId).subscribe(function (x) {
            _this.dataUser = JSON.parse(x['_body'])['data'];
            loading.dismiss();
            console.log('xxxx', _this.dataUser);
        });
    };
    IntEventoPage.prototype.dia = function (fecha) {
        var day = fecha.split("-").reverse();
        return day[0] + '/' + day[1] + '/' + day[2];
    };
    IntEventoPage.prototype.validarBtn = function (info) {
        var date = new Date();
        var dateEvento = new Date(info.fechaevento);
        if (date > dateEvento) {
            return false;
        }
        else {
            return true;
        }
    };
    IntEventoPage.prototype.mostrarDia = function (fecha) {
        var date = new Date(fecha);
        var dia = date.getDay() + 1 > 31 ? date.getDay() : date.getDay() + 1;
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
        return day;
    };
    IntEventoPage.prototype.goToReserva = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__confirm_reserva_confirm_reserva__["a" /* ConfirmReservaPage */], this.info);
    };
    IntEventoPage.prototype.checkout = function () {
        // let money: string = btoa(JSON.stringify(this.valor));
        // let moneyAgain: string = btoa(JSON.stringify(this.valor));
        var money = btoa(this.valor);
        var moneyAgain = btoa(this.valor);
        this.urlMP =
            this.web +
                this.price +
                "LzY63" +
                money +
                "&" +
                this.priceAgain +
                "LzY63" +
                moneyAgain +
                "&" +
                this.idWord +
                "LzY63" +
                this.idNumber,
            "_blank",
            "location=yes";
        var target = "_blank";
        this.iab.create(this.urlMP, target, this.options);
    };
    IntEventoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-int-evento',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/int-evento/int-evento.html"*/'<ion-header no-border no-shadow>\n  <ion-navbar no-border no-shadow hideBackButton>\n    <ion-row>\n      <ion-col>\n        <button style="background-color: transparent !important;border-radius: 0px !important; box-shadow: none !important;" ion-button navPop icon-only>\n          <ion-icon name="appname-back"></ion-icon>\n		    </button>\n      </ion-col>\n      <ion-col>\n        <ion-title text-center>\n          <img class="header" style="max-width: 40% !important;" src="../../assets/imgs/icono-er.svg">\n        </ion-title>\n      </ion-col>\n      <ion-col (click)="editarPerfil()">\n        <ion-buttons end>\n          <img class="imgPerfil" style="max-width: 40% !important;" [src]="getTrustImg(imgSrc)">\n        </ion-buttons>\n      </ion-col>\n    </ion-row>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-card style="margin-top:0px; margin-bottom: 0px;">\n    <ion-card-header text-center>\n      {{nombreLocal}}\n    </ion-card-header>\n    <ion-card-content>\n      <img style="border-radius: 15px;" src="{{url+info.foto}}">\n      <ion-row justify-contetn-center>\n        <ion-item style="border-bottom: 1.5px solid #d7d7d7;">\n          <h4 class="title" text-center>{{info.nombre}}</h4>\n          <h6 class="fecha" text-center>{{dia(info.fechaevento)}}</h6>\n        </ion-item>\n        <ion-item>\n          <h6 *ngIf="(info.precio == 0)" text-center style="font-size: 1.6rem; color: #ababab;">Evento Gratis</h6>\n          <h6 *ngIf="!(info.precio == 0)" text-center style="font-size: 1.6rem; color: #ababab;">${{info.precio}}</h6>\n        </ion-item>\n      </ion-row>\n      <ion-row *ngIf="validarBtn(info)" justify-contetn-center>\n        <button *ngIf="!(0 == info.precio)" (click)="checkout()" style="height: 50px; background-color: #51bf5c; text-transform: none;" ion-button full round icon-start>\n          <ion-icon name="card"></ion-icon>\n          Pagar\n        </button>\n        <button (click)="goToReserva()" style="margin-top:10px; height: 50px; background-color: #ababab; text-transform: none;" ion-button full round>Reservar</button>\n        <ion-item *ngIf="!(0 == info.precio)">\n          <p text-center style="font-size: 1.1rem;">La simple reserva no asegura el ingreso ni el precio</p>\n        </ion-item>\n        <ion-item>\n          <h6 text-center text-wrap>{{info.direccion}}</h6>\n        </ion-item>\n      </ion-row>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/int-evento/int-evento.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__providers_services_services__["a" /* ServicesProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], IntEventoPage);
    return IntEventoPage;
}());

//# sourceMappingURL=int-evento.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__change_pass_change_pass__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tabs_tabs__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__perfil_perfil__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__info_slide_info_slide__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_services_services__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_facebook__ = __webpack_require__(221);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, toastCtrl, loadingCtrl, service, fb, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.service = service;
        this.fb = fb;
        this.storage = storage;
        this.user = {
            usuario: '',
            password: ''
        };
        this.msgError = '';
        this.data = [];
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        if (this.validacion()) {
            this.service.validarUser(this.user).subscribe(function (x) {
                console.log('vuetaUser', x);
                _this.data = JSON.parse(x['_body']);
                if (_this.data['data']['usuarioid'] !== 0) {
                    //guarda usuarioid
                    console.log('login', _this.data['data']);
                    _this.storage.set('userId', _this.data['data']['usuarioid']);
                    _this.storage.set('photo_perfil', "http://estareservado.ctrlztest.com.ar/" + _this.data['data']['foto']);
                    setTimeout(function () {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__info_slide_info_slide__["a" /* InfoSlidePage */]);
                        //this.toastExito()
                    }, 500);
                }
                else {
                    _this.msgError = "Oh no! \n Ocurrio un error, prueba nuevamente y verifica correctamente los pasos.";
                    _this.user.usuario = "";
                    _this.user.password = "";
                    _this.toastError();
                }
            });
        }
        else {
            this.toastError();
        }
    };
    LoginPage.prototype.emailIsValid = function (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    LoginPage.prototype.validacion = function () {
        var ret = true;
        var msg = "";
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
    };
    LoginPage.prototype.toastExito = function () {
        var toast = this.toastCtrl.create({
            message: 'Bienvenido a EstáReservado!',
            duration: 2000,
            position: 'top',
            cssClass: 'toastExito'
        });
        toast.present();
    };
    LoginPage.prototype.toastError = function () {
        var toast = this.toastCtrl.create({
            message: this.msgError,
            showCloseButton: true,
            closeButtonText: "X",
            duration: 3000,
            position: 'top',
            cssClass: 'toastError'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    //login with Facebook
    LoginPage.prototype.loginAction = function () {
        var _this = this;
        //permissions
        this.fb.login(['public_profile', 'email'])
            .then(function (res) {
            console.log('res', res);
            if (res.status == "connected") {
                //Get user ID an Token
                var fb_id = res.authResponse.userID;
                _this.storage.set('fbId', fb_id);
                var fb_token = res.authResponse.accessToken;
                console.log('id and toke', fb_id, fb_token);
                //Get user infos from the API
                _this.fb.api("/me?fields=name,email", [])
                    .then(function (user) {
                    console.log('userFB', user);
                    var name = user.name;
                    var nameUser = name.split(" ")[0];
                    var email = user.email;
                    if (email != "") {
                        //this.storage.set('emailFB', email);
                        var loading_1 = _this.loadingCtrl.create({
                            spinner: 'bubbles',
                            content: 'Espere por favor...'
                        });
                        _this.service.validarFbId(fb_id).subscribe(function (x) {
                            console.log('vueltaApiFB', JSON.parse(x['_body']));
                            _this.data = JSON.parse(x['_body']);
                            if (_this.data['data']['usuarioid'] === 0) {
                                loading_1.dismiss();
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__perfil_perfil__["a" /* PerfilPage */], { fbId: fb_id, name: nameUser, email: email });
                            }
                            else {
                                _this.storage.set('userId', _this.data['data']['usuarioid']);
                                loading_1.dismiss();
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_1__tabs_tabs__["a" /* TabsPage */]);
                            }
                        });
                    }
                });
            }
            else {
                //error ocurred while loging-in
                console.log("Error ocurred");
            }
        })
            .catch(function (error) {
            console.log('Error logging into Facebook', error);
        });
    };
    LoginPage.prototype.crearCuenta = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__perfil_perfil__["a" /* PerfilPage */]);
    };
    LoginPage.prototype.recuperarPass = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__change_pass_change_pass__["a" /* ChangePassPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/login/login.html"*/'<ion-content no-padding>\n  <ion-list style="margin-top: 5%;" id="cloud-layer">\n    <ion-row>\n      <ion-col>\n        <img src="../../assets/imgs/1-login/logo1.png"/>\n      </ion-col>\n    </ion-row>\n    <ion-row style="margin-top: 5%;">\n      <ion-col>\n        <ion-item>\n          <ion-label><ion-icon name="appname-username"></ion-icon></ion-label>\n          <ion-input class="placeholder-text" placeholder="Usuario (e-mail)" type="email" required [(ngModel)]=user.usuario></ion-input>\n        </ion-item>    \n        <ion-item>\n          <ion-label><ion-icon name="appname-password"></ion-icon></ion-label>\n          <ion-input class="placeholder-text" placeholder="Contraseña" type="password" required [(ngModel)]=user.password></ion-input>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n    <ion-row style="margin-top: 5%;">\n      <ion-col>\n        <button ion-button class="submit-btn" full outline (click)="login()">Ingresar</button>\n      </ion-col>\n    </ion-row>\n    <ion-row>  \n      <ion-col>\n        <button ion-button class="submit-btnFB" full (click)="loginAction()">Iniciar Sesion con Facebook</button>\n      </ion-col>\n    </ion-row>\n    <ion-row style="margin-top: 5%;">\n      <ion-col>\n        <p text-center style="margin-bottom: 0px !important; font-size: 0.9em; text-transform: uppercase; color: white !important;" (click)="crearCuenta()">Registrarme</p>\n      </ion-col>\n    </ion-row>\n    <ion-row no-margin no-padding justify-content-center>\n      <p no-margin text-center style="margin-top: 5px; font-size: 0.9em; text-transform: uppercase; color: white !important;" (click)="recuperarPass()">¿Olvidaste tu contraseña?</p>\n    </ion-row>\n  </ion-list>\n</ion-content>\n<ion-footer>\n  <ion-row style="bottom: 0px !important;" justify-content-center>\n    <p text-center text-wrap style="color: darkgray; padding: 0 32px;">Al continuar aceptás nuestros Términos de servicio y Políticas de Privacidad. No publicaremos nada en Facebook sin autorización</p>\n  </ion-row>\n</ion-footer>\n\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_services_services__["a" /* ServicesProvider */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoSlidePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tabs_tabs__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { PerfilPage } from './../perfil/perfil';
//import { HomePage } from './../home/home';




var InfoSlidePage = /** @class */ (function () {
    function InfoSlidePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.muestraBtn = false;
    }
    InfoSlidePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InfoSlidePage');
    };
    InfoSlidePage.prototype.goToHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__tabs_tabs__["a" /* TabsPage */]);
    };
    InfoSlidePage.prototype.slideChanged = function () {
        if (this.slides.isEnd()) {
            this.muestraBtn = true;
        }
        else {
            this.muestraBtn = false;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* Slides */])
    ], InfoSlidePage.prototype, "slides", void 0);
    InfoSlidePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-info-slide',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/info-slide/info-slide.html"*/'<ion-header transparent no-border>\n  <ion-navbar transparent no-shadow >\n    <ion-title></ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n  <ion-slides pager="true" style="height: 85% !important;" (ionSlideDidChange)="slideChanged()">\n    <ion-slide>\n      <img style="max-width: 50% !important;" src="../../assets/imgs/info-slide/candado.png" >\n      <div padding>\n        <h1 style="color: white;">Seguridad</h1>\n        <p style="color: white;" padding text-wrap>Elegí el metodo de pago y hace tu reserva.<br/>¡Simple, rápido y seguro!</p>\n      </div>\n    </ion-slide>\n    <ion-slide>\n      <img style="max-width: 50% !important;" src="../../assets/imgs/info-slide/cerveza.png" >\n      <div padding>\n        <h1 style="color: white;">Alternativas</h1>\n        <p style="color: white;" padding text-wrap>¡Conocé todas las alternativas para divertirte con amigos, y elegí la que mas te guste!</p>\n      </div>\n    </ion-slide>\n    <ion-slide>\n      <img style="max-width: 50% !important;" src="../../assets/imgs/info-slide/calendario.png" >\n      <div padding>\n        <h1 style="color: white;">Promociones</h1>\n        <p style="color: white;" padding text-wrap>Selecciná el día que querés asistir y disfruta los descuentos y beneficios exclusivos.</p>\n      </div>\n    </ion-slide>\n  </ion-slides>\n  <ion-row justify-content-center padding *ngIf="muestraBtn">\n    <button (click)="goToHome()" style="margin: 10px auto; height: 45px; background-color: white; color: black; font-size: 0.8em;" ion-button full round>Siguiente</button>\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/info-slide/info-slide.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */]])
    ], InfoSlidePage);
    return InfoSlidePage;
}());

//# sourceMappingURL=info-slide.js.map

/***/ }),

/***/ 124:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 124;

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TerminosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the TerminosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TerminosPage = /** @class */ (function () {
    function TerminosPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    TerminosPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TerminosPage');
    };
    TerminosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-terminos',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/terminos/terminos.html"*/'<ion-header no-border no-shadow>\n  <ion-navbar no-border no-shadow hideBackButton>\n    <ion-row>\n      <ion-col>\n        <button style="background-color: transparent !important;border-radius: 0px !important; box-shadow: none !important;" ion-button navPop icon-only>\n          <ion-icon name="appname-back"></ion-icon>\n        </button>\n      </ion-col>\n      <ion-col>\n        <ion-title>\n          Términos y condiciones\n        </ion-title>\n      </ion-col>\n      <ion-col>\n      </ion-col>\n    </ion-row>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-row class="_content" padding justify-content-center>\n    <ion-col col-12 text-center>\n      <h3 text-center>Términos y condiciones</h3>\n    </ion-col>\n    <ion-col style="padding-top: 0px;" col-12 padding>\n      <p padding text-center>\n        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius blanditiis neque accusantium temporibus consequuntur unde distinctio aspernatur hic possimus sint quae dolorum, esse, vel odio assumenda, aliquam nisi eaque? Commodi.\n      </p>\n    </ion-col>\n  </ion-row>\n  <ion-row justify-content-center>\n    <ion-item style="padding-left: 50px !important; text-align: start;" no-lines>\n      <ion-label text-wrap style="font-size: 1.7rem; color: #9a9a9a;">Acepto los Términos y condiciones</ion-label>\n      <ion-checkbox style="margin: 9px !important;" color="secondary" checked></ion-checkbox>\n    </ion-item>\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/terminos/terminos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], TerminosPage);
    return TerminosPage;
}());

//# sourceMappingURL=terminos.js.map

/***/ }),

/***/ 167:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 167;

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServicesProvider; });
/* unused harmony export Auth */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators_tap__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators_tap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_tap__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ServicesProvider = /** @class */ (function () {
    function ServicesProvider(http, storage) {
        this.http = http;
        this.storage = storage;
        this.localesMap = [];
        this._auth = new Auth();
        console.log('Hello ServicesProvider Provider');
    }
    ServicesProvider.prototype.createUserFB = function (user, facebookid, foto) {
        var url = "http://estareservado.ctrlztest.com.ar/crearusuario.php";
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('content-type', 'application/x-www-form-urlencoded');
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers, withCredentials: true });
        var body = JSON.stringify({
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            telefono: user.telefono,
            dni: user.dni,
            fechanacimiento: user.nacimiento,
            password: user.pass,
            rolid: 1,
            facebookid: facebookid,
            foto: foto
        });
        return this.http.post(url, body, options).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_tap__["tap"])(function (x) {
            console.log('dataLocales', x);
        }));
    };
    ServicesProvider.prototype.createUser = function (user, foto) {
        console.log('userBACK', user.nombre);
        var url = "http://estareservado.ctrlztest.com.ar/crearusuario.php";
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('content-type', 'application/x-www-form-urlencoded');
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers, withCredentials: true });
        var body = JSON.stringify({
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            telefono: user.telefono,
            dni: user.dni,
            fechanacimiento: user.nacimiento,
            password: user.pass,
            rolid: 1,
            facebookid: 0,
            foto: foto
        });
        console.log('body', body);
        return this.http.post(url, body, options).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_tap__["tap"])(function (x) {
            console.log('dataLocales', x);
        }));
    };
    ServicesProvider.prototype.updateUser = function (id, user, foto) {
        console.log('userBACK', id);
        var url = "http://estareservado.ctrlztest.com.ar/actualizarusuario.php";
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('content-type', 'application/x-www-form-urlencoded');
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers, withCredentials: true });
        var body = JSON.stringify({
            usuarioid: id,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            telefono: user.telefono,
            dni: user.dni,
            fechanacimiento: user.nacimiento,
            password: user.pass,
            rolid: 1,
            foto: foto
        });
        console.log('body', body);
        return this.http.post(url, body, options).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_tap__["tap"])(function (x) {
            console.log('upadteUser', x);
        }));
    };
    ServicesProvider.prototype.updateImage = function (id, foto) {
        console.log('userBACK', id);
        var url = "http://estareservado.ctrlztest.com.ar/actualizarimagen.php";
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('content-type', 'application/x-www-form-urlencoded');
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers, withCredentials: true });
        var body = JSON.stringify({
            usuarioid: id,
            foto: foto
        });
        console.log('body', body);
        return this.http.post(url, body, options).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_tap__["tap"])(function (x) {
            console.log('upadteImage', x);
        }));
    };
    ServicesProvider.prototype.validarUser = function (user) {
        var _this = this;
        var url = "http://estareservado.ctrlztest.com.ar/validarusuarioadmin.php?usuario=" + user.usuario + "&contrasenia=" + user.password;
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('content-type', 'application/x-www-form-urlencoded');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(url, requestOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_tap__["tap"])(function (x) {
            console.log('usuario', x);
            _this.storage.set('userId', JSON.parse(x['_body'])['data']['usuarioid']);
            _this.storage.set('photo_perfil', JSON.parse(x['_body'])['data']['foto']);
            _this._auth.usuarioId = JSON.parse(x['_body'])['data']['usuarioid'];
        }));
    };
    ServicesProvider.prototype.getLocales = function () {
        var url = "http://estareservado.ctrlztest.com.ar/traerlocales.php";
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('content-type', 'application/x-www-form-urlencoded');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(url, requestOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_tap__["tap"])(function (x) {
            console.log('dataLocales', x);
        }));
    };
    ServicesProvider.prototype.getEventosLocal = function (id) {
        var url = "http://estareservado.ctrlztest.com.ar/traereventosxlocal.php?localid=" + id;
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('content-type', 'application/x-www-form-urlencoded');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(url, requestOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_tap__["tap"])(function (x) {
            console.log('eventos', x);
        }));
    };
    ServicesProvider.prototype.getDataUser = function (userId) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('content-type', 'application/x-www-form-urlencoded');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post('http://estareservado.ctrlztest.com.ar/traerperfilusuario.php?userid=' + userId, {}, requestOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_tap__["tap"])(function (x) {
            console.log('dataUser', x);
        }));
    };
    ServicesProvider.prototype.getReservasUser = function (userId) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('content-type', 'application/x-www-form-urlencoded');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post('http://estareservado.ctrlztest.com.ar/traermisreservas.php?usuarioid=' + userId, {}, requestOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_tap__["tap"])(function (x) {
            console.log('dataUser', JSON.parse(x['_body']));
        }));
    };
    ServicesProvider.prototype.validarFbId = function (facebookid) {
        var _this = this;
        var url = "http://estareservado.ctrlztest.com.ar/validarusuario.php?facebookid=" + facebookid;
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('content-type', 'application/x-www-form-urlencoded');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(url, requestOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_tap__["tap"])(function (x) {
            console.log('usuario', x);
            _this._auth.usuarioId = JSON.parse(x['_body'])['data']['usuarioid'];
        }));
    };
    ServicesProvider.prototype.recuperarPass = function (email) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('content-type', 'application/x-www-form-urlencoded');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post('http://estareservado.ctrlztest.com.ar/recuperarpass.php?email=' + email, {}, requestOptions).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_tap__["tap"])(function (x) {
            console.log('dataUser', x);
        }));
    };
    ServicesProvider.prototype.crearReserva = function (userId, eventoId) {
        var url = "http://estareservado.ctrlztest.com.ar/crearreserva.php";
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('content-type', 'application/x-www-form-urlencoded');
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers, withCredentials: true });
        var body = JSON.stringify({
            usuarioid: userId,
            eventoid: eventoId,
        });
        console.log('body', body);
        return this.http.post(url, body, options).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_tap__["tap"])(function (x) {
            console.log('dataLocales', x);
        }));
    };
    ServicesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_0__ionic_storage__["b" /* Storage */]])
    ], ServicesProvider);
    return ServicesProvider;
}());

var Auth = /** @class */ (function () {
    function Auth() {
    }
    return Auth;
}());

//# sourceMappingURL=services.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyPopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MyPopoverPage = /** @class */ (function () {
    function MyPopoverPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.horarios = [];
        this.data = false;
    }
    MyPopoverPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyPopoverPage');
    };
    MyPopoverPage.prototype.ionViewWillEnter = function () {
        this.mostrarDia();
        console.log('harios', this.horarios);
    };
    MyPopoverPage.prototype.mostrarDia = function () {
        var _this = this;
        if (this.navParams.data['horarios'].length == 0) {
            this.data = true;
        }
        else {
            this.data = false;
            this.horarios = this.navParams.data['horarios'].map(function (horario) {
                switch (horario['dia']) {
                    case "7":
                        return { dia: "Domingo", desde: _this.recortar(horario['horadesde']), hasta: _this.recortar(horario['horahasta']) };
                    case "1":
                        return { dia: "Lunes", desde: _this.recortar(horario['horadesde']), hasta: _this.recortar(horario['horahasta']) };
                    case "2":
                        return { dia: "Martes", desde: _this.recortar(horario['horadesde']), hasta: _this.recortar(horario['horahasta']) };
                    case "3":
                        return { dia: "Miércoles", desde: _this.recortar(horario['horadesde']), hasta: _this.recortar(horario['horahasta']) };
                    case "4":
                        return { dia: "Jueves", desde: _this.recortar(horario['horadesde']), hasta: _this.recortar(horario['horahasta']) };
                    case "5":
                        return { dia: "Viernes", desde: _this.recortar(horario['horadesde']), hasta: _this.recortar(horario['horahasta']) };
                    case "6":
                        return { dia: "Sábados", desde: _this.recortar(horario['horadesde']), hasta: _this.recortar(horario['horahasta']) };
                }
            });
            console.log('horarios', this.horarios);
        }
    };
    MyPopoverPage.prototype.recortar = function (hora) {
        var horasplit = hora.split(":");
        return horasplit[0] + ":" + horasplit[1];
    };
    MyPopoverPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-popover',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/my-popover/my-popover.html"*/'<ion-content>\n  <p padding *ngIf="data" text-center>Sin horarios agregados!</p>\n  <ion-list *ngIf="!data">\n    <ion-row *ngFor="let hora of horarios">\n      <ion-col col-4>\n        {{hora.dia}}\n      </ion-col>\n      <ion-col col-8>\n        {{hora.desde}} - {{hora.hasta}} \n      </ion-col>\n    </ion-row>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/my-popover/my-popover.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], MyPopoverPage);
    return MyPopoverPage;
}());

//# sourceMappingURL=my-popover.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePassPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_services_services__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var ChangePassPage = /** @class */ (function () {
    function ChangePassPage(navCtrl, navParams, toastController, services) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastController = toastController;
        this.services = services;
    }
    ChangePassPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChangePassPage');
    };
    ChangePassPage.prototype.emailIsValid = function (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    ChangePassPage.prototype.recuperarPass = function (email) {
        var _this = this;
        console.log('email', email);
        if (!this.emailIsValid(this.email)) {
            this.services.recuperarPass(email).subscribe(function (x) {
                console.log('data', x);
                if (x['status'] === 200) {
                    var msg = 'Listo! \n Te enviamos un email a tu casilla.';
                    _this.presentToast(msg);
                    setTimeout(function () {
                        _this.navCtrl.pop();
                    }, 2000);
                }
                else {
                    var msg = "Oh no! \n Por favor verifica que sea un email válido, o no estas registrado.";
                    _this.presentToast(msg);
                    setTimeout(function () {
                        _this.navCtrl.pop();
                    }, 2000);
                }
            });
        }
        else {
            var msg = "Oh no! \n Por favor verifica que sea un email válido, o no estas registrado.";
            this.presentToast(msg);
        }
    };
    ChangePassPage.prototype.presentToast = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: msg,
                            duration: 2000,
                            showCloseButton: true,
                            position: 'top',
                            cssClass: 'toastExito',
                            closeButtonText: 'x'
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChangePassPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-change-pass',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/change-pass/change-pass.html"*/'<ion-header no-shadow no-border transparent>\n  <ion-navbar no-shadow no-border transparent>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <ion-list id="cloud-layer">\n    <ion-row>\n      <ion-col>\n        <img src="../../assets/imgs/1-login/logo1.png"/>\n      </ion-col>\n    </ion-row>\n    <ion-row style="margin-top: 10%;">\n      <ion-col>\n        <ion-item>\n          <ion-label><ion-icon name="appname-username"></ion-icon></ion-label>\n          <ion-input class="placeholder-text" placeholder="Ingesá tu email" type="email" required [(ngModel)]="email"></ion-input>\n        </ion-item>\n        <ion-row style="margin-top:20px;">\n          <ion-col>\n            <button ion-button class="submit-btn" full outline (click)="recuperarPass(email)">Enviar</button>\n          </ion-col>\n        </ion-row>\n      </ion-col>\n    </ion-row>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/change-pass/change-pass.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_0__providers_services_services__["a" /* ServicesProvider */]])
    ], ChangePassPage);
    return ChangePassPage;
}());

//# sourceMappingURL=change-pass.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmReservaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_services_services__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__confirm_confirm__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ConfirmReservaPage = /** @class */ (function () {
    function ConfirmReservaPage(navCtrl, navParams, toastCtrl, services, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.services = services;
        this.storage = storage;
        this.info = [];
        this.data = [];
        this.url = "http://estareservado.ctrlztest.com.ar/";
        this.info = this.navParams.data;
        console.log('data', this.info);
    }
    ConfirmReservaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ConfirmReservaPage');
    };
    ConfirmReservaPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.info = this.navParams.data;
        this.storage.get('userId').then(function (x) {
            _this.userId = x;
        });
    };
    ConfirmReservaPage.prototype.goToConfirmacion = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__confirm_confirm__["a" /* ConfirmPage */]);
    };
    ConfirmReservaPage.prototype.crearReserva = function () {
        var _this = this;
        this.services.crearReserva(this.userId, this.info['id']).subscribe((function (x) {
            console.log('vueltaRecervaCreada', x);
            _this.data = JSON.parse(x['_body']);
            if (_this.data['data'] == 'inserted') {
                _this.toastExito();
                setTimeout(function () {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__confirm_confirm__["a" /* ConfirmPage */]);
                }, 1000);
            }
            else {
                _this.msg = "Oh no! \n Ya reservaste este evento!";
                _this.toastError();
            }
        }));
    };
    ConfirmReservaPage.prototype.toastExito = function () {
        var toast = this.toastCtrl.create({
            message: 'Listo! \n Realizaste la reserva con éxito!',
            duration: 2000,
            position: 'top',
            cssClass: 'toastExito'
        });
        toast.present();
    };
    ConfirmReservaPage.prototype.toastError = function () {
        var toast = this.toastCtrl.create({
            message: this.msg,
            showCloseButton: true,
            closeButtonText: "X",
            duration: 5000,
            position: 'top',
            cssClass: 'toastError'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    ConfirmReservaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-confirm-reserva',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/confirm-reserva/confirm-reserva.html"*/'<ion-header no-border no-shadow>\n  <ion-navbar no-border no-shadow hideBackButton>\n    <ion-row>\n      <ion-col>\n        <button style="background-color: transparent !important;border-radius: 0px !important; box-shadow: none !important;" ion-button navPop icon-only>\n          <ion-icon name="appname-back"></ion-icon>\n		    </button>\n      </ion-col>\n      <ion-col>\n        <ion-title text-center>\n          <img class="header" style="max-width: 40% !important;" src="../../assets/imgs/icono-er.svg">\n        </ion-title>\n      </ion-col>\n      <ion-col></ion-col>\n    </ion-row>\n  </ion-navbar>\n</ion-header>\n\n<ion-content *ngIf=info>\n  <ion-grid>\n    <ion-row>\n      <ion-col style="text-align: center; margin: 10px;">\n        <img class="fotoEvento" src="{{url+info.foto}}">\n      </ion-col>\n    </ion-row>\n    <ion-row justify-content-center>\n      <h6 text-center style="margin-top: 0.5rem !important;">{{info.nombre}}</h6>\n    </ion-row>\n    <ion-row justify-content-center>\n      <button style="background-color:#2896a7 !important; height: 45px; margin: 10px;" (click)="crearReserva()" ion-button full round>Confirmar Reserva</button>\n    </ion-row>\n    <ion-row justify-content-center>\n      <p *ngIf="!(info.precio == 0)" style="color: #656565;" padding text-center text-wrap>La reserva no asegura el lugar hasta que el pago no sea realizado</p>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/confirm-reserva/confirm-reserva.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1__providers_services_services__["a" /* ServicesProvider */],
            __WEBPACK_IMPORTED_MODULE_0__ionic_storage__["b" /* Storage */]])
    ], ConfirmReservaPage);
    return ConfirmReservaPage;
}());

//# sourceMappingURL=confirm-reserva.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConfirmPage = /** @class */ (function () {
    function ConfirmPage(navCtrl, nav, navParams) {
        this.navCtrl = navCtrl;
        this.nav = nav;
        this.navParams = navParams;
        this.tab = this.navCtrl.parent;
    }
    ConfirmPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad ConfirmPage');
        setTimeout(function () {
            _this.tab.select(0);
        }, 3000);
    };
    ConfirmPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-confirm',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/confirm/confirm.html"*/'<ion-content >\n  <ion-row style="margin-top: 70%;">\n    <ion-col style="text-align: center;">\n      <p style="color: black;">Muchas gracias por utilizar <strong>EstáReservado</strong>,<br/>su reserva ha sido confirmada.</p>\n    </ion-col>\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/confirm/confirm.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], ConfirmPage);
    return ConfirmPage;
}());

//# sourceMappingURL=confirm.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_geolocation__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_services_services__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_launch_navigator__ = __webpack_require__(215);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var MapPage = /** @class */ (function () {
    function MapPage(navCtrl, navParams, service, geo, launchNavigator) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.geo = geo;
        this.launchNavigator = launchNavigator;
        this.boliches = [];
        this.infoWindows = [];
        this.slideOpts = {
            effect: 'flip'
        };
        this.num = 0;
        this.indexBol = 0;
        this.location = {
            lat: "",
            lng: ''
        };
        this.url = "http://estareservado.ctrlztest.com.ar/";
    }
    MapPage.prototype.slideChanged = function () {
        var currentIndex = this.slides.getActiveIndex();
        console.log('index', currentIndex);
    };
    MapPage.prototype.ionViewDidLoad = function () {
        this.getCurrentPosition();
    };
    MapPage.prototype.setLocation = function () {
        var _this = this;
        var geocoder = new google.maps.Geocoder();
        this.boliches = this.service.localesMap;
        console.log('boliches', this.service.localesMap);
        this.boliches.map(function (x) {
            x.index = _this.num++;
            var address = x.direccion;
            geocoder.geocode({ 'address': address }, function (results, status) {
                console.log('results', results);
                console.log('status', status);
                if (status === 'OK') {
                    //this.map.setCenter(results[0].geometry.location);
                    console.log('results', results);
                    /* x.location['lat'] = results[0].geometry.location.lat();
                    x.location['lng'] = results[0].geometry.location.lng(); */
                    _this.dogwalkMarker = new google.maps.Marker({
                        draggable: false,
                        animation: google.maps.Animation.DROP,
                        position: results[0].geometry.location,
                        icon: {
                            url: _this.url + x.foto,
                            origin: new google.maps.Point(0, 0),
                            size: new google.maps.Size(50, 50),
                            scaledSize: new google.maps.Size(40, 40)
                        },
                        title: x.nombre,
                        info: x,
                        index: _this.num,
                    });
                    _this.num++;
                    _this.dogwalkMarker.setMap(_this.map);
                    _this.addInfoWindowToMarker(_this.dogwalkMarker);
                }
                else {
                    console.log('Geocode was not successful for the following reason: ' + status);
                }
                ;
            });
        });
    };
    MapPage.prototype.getCurrentPosition = function () {
        var _this = this;
        this.geo.getCurrentPosition().then(function (pos) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.location.lat = pos.coords.latitude;
                        this.location.lng = pos.coords.longitude;
                        console.log('position', this.location);
                        return [4 /*yield*/, this.loadMap(this.location)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    MapPage.prototype.loadMap = function (location) {
        //create a new map by passing HTMLElement
        var mapEle = document.getElementById('map');
        //Map options
        var options = {
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
        };
        //crete marker myposition
        var marker = new google.maps.Marker({
            position: location,
            map: this.map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            label: 'Yo!'
        });
        //create map
        this.map = new google.maps.Map(mapEle, options);
        marker.setMap(this.map);
        this.map.setCenter(location);
        this.setLocation();
    };
    //infoWindowMarkers
    MapPage.prototype.addInfoWindowToMarker = function (marker) {
        var _this = this;
        var infoMarker = marker['info'];
        console.log('mark', marker);
        var infoWindowContent = "<div id=container style='color:#000;background-color:#fff;padding:5px;width:150px;'>" +
            "<h4 style='margin:0px'>" + marker.title + "</h4>" +
            "<hr />" +
            "<div id=imageInfo>" +
            "<img src=" + marker.icon.url + ">" +
            "</div>" +
            "<hr />" +
            "<button id=goToLocal>Detalle Local</button>" +
            "</div>";
        var infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent,
            info: marker
        });
        google.maps.event.addListenerOnce(infoWindow, 'domready', function () {
            //console.log('esteEs', infoWindow.info);
            _this.info = infoWindow.info;
            document.getElementById('goToLocal').addEventListener('click', function () {
                var animationOptions = {
                    animation: 'md-transition',
                    duration: 1000,
                };
                //console.log('aqui',this.info);
                //this.navCtrl.push(InfoLocalPage, {info:this.info}, animationOptions);
            });
        });
        marker.addListener('click', function () {
            console.log('aquiiii', marker);
            _this.boliches.filter(function (bol) {
                if (bol['nombre'] === marker['title']) {
                    console.log('markerName', marker['title']);
                    console.log('bol', bol);
                    _this.goToSlide(bol['index']);
                }
            });
            //console.log('nameBOL', nombreBol);
            _this.closeAllInfoWindows();
            //infoWindow.open(this.map, marker)
        });
        this.infoWindows.push(infoWindow);
    };
    //cerrar infoWindow
    MapPage.prototype.closeAllInfoWindows = function () {
        for (var _i = 0, _a = this.infoWindows; _i < _a.length; _i++) {
            var window_1 = _a[_i];
            window_1.close();
        }
    };
    MapPage.prototype.goToSlide = function (index) {
        console.log(this.slides);
        this.slides.slideTo(index, 500);
    };
    MapPage.prototype.goToLocal = function (local) {
        console.log('local', local);
        /* let options: LaunchNavigatorOptions = {
          start: this.location,
          app: this.launchNavigator.APP.GOOGLE_MAPS,
        };*/
        this.launchNavigator.navigate(local['direccion']).then(function (success) {
            console.log('success', success);
        }, function (error) {
            console.log('error Launch', error);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_core__["t" /* ElementRef */])
    ], MapPage.prototype, "mapRef", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* Slides */])
    ], MapPage.prototype, "slides", void 0);
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-map',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/map/map.html"*/'<!-- <ion-header transparent no-border no-shadow>\n  <ion-navbar transparent no-border no-shadow>\n  </ion-navbar>\n</ion-header> -->\n\n<ion-content style = "width: 100%; height: 100%;">\n  <div #map id="map">\n  </div>\n  <div class="slider-wraper" style="width: 100% !important;">\n    <ion-slides style="width: 100% !important;" slidesPerView="1.2" (ionSlideDidChange)="slideChanged()">\n      <ion-slide *ngFor="let bol of boliches" style="width: auto !important;">\n        <ion-card class="slide-bol">\n          <ion-item>\n            <ion-thumbnail item-start>\n              <img class="firstImg" src="{{url+bol.foto}}"/>\n            </ion-thumbnail>\n            <ion-icon name="navigate" item-end (click)="goToLocal(bol)"></ion-icon>\n            <h2>\n              {{bol.nombre}}\n            </h2>\n            <p style="font-size: 0.7em;">\n              <ion-icon name="pin"></ion-icon>  {{bol.direccion}}\n            </p>\n            <p style="font-size: 0.7em;" text-wrap>\n              <ion-icon name="pin"></ion-icon> Estas a {{bol.distance}} - {{bol.duration}}\n            </p>\n          </ion-item>\n        </ion-card>          \n      </ion-slide>\n    </ion-slides>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/map/map.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__providers_services_services__["a" /* ServicesProvider */],
            __WEBPACK_IMPORTED_MODULE_0__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_launch_navigator__["a" /* LaunchNavigator */]])
    ], MapPage);
    return MapPage;
}());

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReservasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__int_evento_int_evento__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__qr_data_qr_data__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_services_services__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ReservasPage = /** @class */ (function () {
    function ReservasPage(navCtrl, navParams, services, toastCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.services = services;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.listaFechasAnteriores = [];
        this.listaFechasVigentes = [];
        this.fechas = [];
        this.fechasAnt = [];
        this.createdCode = null;
        this.historicos = "vigentes";
        this.reservas = [];
        this.data = [];
        this.reservasVigentes = [];
        this.reservasAnteriores = [];
        this.url = "http://estareservado.ctrlztest.com.ar/";
    }
    ReservasPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReservasPage');
    };
    ReservasPage.prototype.ionViewWillEnter = function () {
        this.getReservas();
    };
    ReservasPage.prototype.createCode = function (id, reserva) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__qr_data_qr_data__["a" /* QrDataPage */], { qrid: id, qrReserva: reserva });
        /* console.log('i', index);
        this.createdCode = id; */
    };
    ReservasPage.prototype.getReservas = function () {
        var _this = this;
        this.reservasAnteriores = [];
        this.reservasVigentes = [];
        this.listaFechasAnteriores = [];
        this.listaFechasVigentes = [];
        this.storage.get('userId').then(function (x) {
            _this.services.getReservasUser(x).subscribe(function (x) {
                _this.data = JSON.parse(x['_body'])['data'];
                _this.reservas = JSON.parse(_this.data)['reserva'];
                console.log('reservas', _this.reservas);
                _this.reservas.map(function (reserva) {
                    console.log('infoReserva', reserva);
                    var hoy = new Date();
                    var fechaEvento = new Date(reserva.fechaevento);
                    console.log('hoy', hoy);
                    console.log('fechaevento', fechaEvento);
                    reserva.btnColor = _this.colorBtn(reserva.estapago);
                    reserva.nameBtn = _this.nameBtn(reserva.estapago);
                    if (hoy <= fechaEvento) {
                        console.log('entr1');
                        _this.reservasVigentes.push(reserva);
                    }
                    else {
                        console.log('entr2');
                        _this.reservasAnteriores.push(reserva);
                    }
                });
                _this.procesarListaAnteriores();
                _this.procesarListaVigentes();
                _this.listaFechasAnteriores.length == 0 ? _this.mostrarmsj = true : _this.mostrarmsj = false;
                _this.listaFechasVigentes.length == 0 ? _this.mostrarmsj1 = true : _this.mostrarmsj1 = false;
                //console.log('reservas', Object.keys(this.listaFechasAnteriores[0]).length);
                console.log('reservaVigentes', _this.reservasVigentes);
                console.log('reservaAnteriores', _this.reservasAnteriores);
            });
        });
    };
    ReservasPage.prototype.mostrarDia = function (fecha) {
        var day = fecha.split("-").reverse();
        return day[0] + '/' + day[1] + '/' + day[2];
    };
    ReservasPage.prototype.dia = function (fecha) {
        //console.log('fecha', fecha);
        var date = new Date(fecha);
        var dia = date.getDay() + 1 > 31 ? date.getDay() : date.getDay() + 1;
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
        return day;
    };
    ReservasPage.prototype.mostrarQR = function (e) {
        var toast = this.toastCtrl.create({
            message: 'MUESTRA EL QR',
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
        /* this.scanner.encode(this.scanner.Encode.TEXT_TYPE, e)
          .then((data)=>{
            this.encodedData = data;
          }, (err)=>{
            console.log('Error', err);
          }) */
    };
    ReservasPage.prototype.colorBtn = function (data) {
        if (data === "0") {
            return "primary";
        }
        else {
            return "secondary";
        }
    };
    ReservasPage.prototype.internaEvento = function (res) {
        console.log(res);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__int_evento_int_evento__["a" /* IntEventoPage */], { event: res });
    };
    ReservasPage.prototype.nameBtn = function (data) {
        if (data === "1") {
            return "Pago";
        }
        else {
            return "Reservado";
        }
    };
    ReservasPage.prototype.procesarListaAnteriores = function () {
        var _this = this;
        var fechaVieja = "";
        var items = {};
        this.reservasAnteriores.map(function (x) {
            _this.fechasAnt.push(fechaVieja);
            if (x.fechaevento != fechaVieja) {
                if (fechaVieja != "") {
                    _this.listaFechasVigentes.push(items);
                    items = {};
                    items['listaEventos'] = [];
                }
            }
            fechaVieja = x.fechaevento;
            items['fecha'] = fechaVieja;
            items['listaEventos'].push(x);
        });
        this.listaFechasAnteriores.push(items);
        console.log(this.listaFechasAnteriores);
    };
    ReservasPage.prototype.procesarListaVigentes = function () {
        var _this = this;
        var fechaVieja = "";
        var items = {};
        items['listaEventos'] = [];
        console.log('vigentes', this.reservasVigentes);
        this.reservasVigentes.map(function (x) {
            if (x.fechaevento != fechaVieja) {
                if (fechaVieja != "") {
                    _this.listaFechasVigentes.push(items);
                    items = {};
                    items['listaEventos'] = [];
                }
            }
            fechaVieja = x.fechaevento;
            items['fecha'] = fechaVieja;
            items['listaEventos'].push(x);
            console.log('item_vigente', items);
        });
        this.listaFechasVigentes.push(items);
        console.log(this.listaFechasVigentes);
    };
    ReservasPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-reservas',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/reservas/reservas.html"*/'<ion-header no-border no-shadow>\n  <ion-navbar no-border no-shadow>\n    <ion-title text-center>Mis reservas</ion-title>\n  </ion-navbar>\n  <ion-toolbar class="segment" no-border-top>\n    <ion-segment [(ngModel)]="historicos">\n      <ion-segment-button value="vigentes">\n        Vigentes\n      </ion-segment-button>\n      <ion-segment-button value="historics">\n        Anteriores\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n  <div [ngSwitch]="historicos">\n    <div *ngSwitchCase="\'vigentes\'">\n      <ion-row *ngIf="reservasVigentes.length == 0" justify-content-center>\n        <p style="color: #656565;" padding text-center text-wrap>No hay reservas relizadas por el momento.</p>\n      </ion-row>\n      <div *ngIf="!(reservasVigentes.length == 0)">\n        <ion-list *ngFor="let reserva of listaFechasVigentes">\n          <ion-row *ngIf="!mostrarmsj1">\n            <ion-list-header text-center style="margin-bottom: 0px !important;">\n              {{dia(reserva.fecha)}} {{mostrarDia(reserva.fecha)}}\n            </ion-list-header>\n            <ion-item *ngFor="let res of reserva.listaEventos" (click)="createCode(res.reservaid, res)">\n                <ion-thumbnail item-start>\n                    <img src="{{url+res.foto}}">\n                  </ion-thumbnail>\n              <ion-row>\n                <ion-col>\n                  <div>{{res.nombrelugar}}</div>\n                  <ion-badge color="badge">{{mostrarDia(res.fechaevento)}}</ion-badge>\n                  <p style="color: #656565; font-size: 0.75em;">Ingresá con tu código QR</p>\n                </ion-col>\n                <ion-col style="text-align: center;">\n                  <button ion-button outline color="{{res.btnColor}}">{{res.nameBtn}}</button>\n                  <!-- <ion-icon name="calendar"></ion-icon>  <ion-icon *ngIf="mostrarIcon(reserva.estapago)" name="logo-pinterest" item-end></ion-icon> -->\n                </ion-col> \n              </ion-row>\n            </ion-item> \n          </ion-row>\n        </ion-list>\n      </div>\n    </div>\n    <div *ngSwitchCase="\'historics\'">\n      <ion-row *ngIf="reservasAnteriores.length == 0" justify-content-center>\n        <p style="color: #656565;" padding text-center text-wrap>No hay reservas relizadas por el momento.</p>\n      </ion-row>\n      <div *ngIf="!(reservasAnteriores.length == 0)">\n        <ion-list *ngFor="let reserva of listaFechasAnteriores">\n          <ion-row *ngIf="!mostrarmsj">\n          <ion-list-header text-center style="margin-bottom: 0px !important;">\n            {{dia(reserva.fecha)}} {{mostrarDia(reserva.fecha)}}\n          </ion-list-header>\n            <ion-item *ngFor="let res of reserva.listaEventos" (click)="internaEvento(res)">\n              <ion-thumbnail item-start>\n                <img src="{{url+res.foto}}">\n              </ion-thumbnail>\n              <ion-row>\n                <ion-col>\n                  <div>{{res.nombrelugar}}</div>\n                  <ion-badge color="badge">{{mostrarDia(res.fechaevento)}}</ion-badge>\n                </ion-col>\n                <ion-col style="text-align: center;">\n                  <button ion-button outline color="{{res.btnColor}}">{{res.nameBtn}}</button>\n                </ion-col> \n              </ion-row>\n            </ion-item> \n          </ion-row>\n        </ion-list>\n      </div>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/reservas/reservas.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_services_services__["a" /* ServicesProvider */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], ReservasPage);
    return ReservasPage;
}());

//# sourceMappingURL=reservas.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QrDataPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__perfil_perfil__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var QrDataPage = /** @class */ (function () {
    function QrDataPage(navCtrl, navParams, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.win = window;
        this.createdCode = null;
        this.createdCode = this.navParams.data['qrid'];
        this.reservaInfo = this.navParams.data['qrReserva'];
    }
    QrDataPage.prototype.editarPerfil = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__perfil_perfil__["a" /* PerfilPage */]);
    };
    QrDataPage.prototype.getTrustImg = function () {
        if (this.imgSrc != 'assets/imgs/perfil-none.png') {
            var path = this.win.Ionic.WebView.convertFileSrc(this.imgSrc);
            console.log(path);
            return path;
        }
        else {
            return this.imgSrc;
        }
    };
    QrDataPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad QrDataPage');
    };
    QrDataPage.prototype.ionViewWillEnter = function () {
        this.mostrarFotoPerfil();
    };
    QrDataPage.prototype.mostrarFotoPerfil = function () {
        var _this = this;
        this.storage.get('photo_perfil').then(function (foto) {
            if (foto) {
                _this.imgSrc = foto;
            }
            else {
                _this.storage.get('fbId').then(function (id) {
                    if (id != null) {
                        _this.imgSrc = "https://graph.facebook.com/" + id + "/picture?type=large&width=90&height=90";
                    }
                    else {
                        _this.imgSrc = "../../assets/imgs/perfil-none.png";
                    }
                });
            }
        });
    };
    QrDataPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-qr-data',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/qr-data/qr-data.html"*/'<ion-header no-border no-shadow>\n  <ion-navbar no-border no-shadow hideBackButton>\n    <ion-row>\n      <ion-col>\n        <button style="background-color: transparent !important;border-radius: 0px !important; box-shadow: none !important;" ion-button navPop icon-only>\n          <ion-icon name="appname-back"></ion-icon>\n		    </button>\n      </ion-col>\n      <ion-col>\n        <ion-title text-center>\n          <img style="max-width: 40% !important;" src="../../assets/imgs/icono-er.svg">\n        </ion-title>\n      </ion-col>\n      <ion-col (click)="editarPerfil()">\n        <ion-buttons end>\n          <img class="imgPerfil" style="max-width: 40% !important;" [src]="getTrustImg(imgSrc)">\n        </ion-buttons>\n      </ion-col>\n    </ion-row>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div class="header-image">\n    QR\n  </div>\n  <ion-row justify-content-center>\n    <ion-card *ngIf="createdCode">\n      <ngx-qrcode [qrc-value]="createdCode"></ngx-qrcode>\n      <ion-card-content>\n        <ion-row justify-content-center>\n          <p text-center>{{reservaInfo.nombre}}</p>\n        </ion-row>\n        <ion-row justify-content-center>\n          <p text-center>{{reservaInfo.fechaevento | date :  "dd/MM/y" }}</p>\n        </ion-row>\n      </ion-card-content>\n    </ion-card>\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/qr-data/qr-data.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], QrDataPage);
    return QrDataPage;
}());

//# sourceMappingURL=qr-data.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__int_local_int_local__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_services_services__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__perfil_perfil__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, services, geo, loadingCtrl, storage) {
        this.navCtrl = navCtrl;
        this.services = services;
        this.geo = geo;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.foto_perfil = false;
        this.win = window;
        this.localesPrev = [];
        this.localesPrev2 = [];
        this.location = {
            lat: 0,
            lng: 0
        };
        this.url = "http://estareservado.ctrlztest.com.ar/";
        //this.getLocales();
        //this.getCurrentPosition();
        this.imgSrc = 'assets/imgs/perfil-none.png';
    }
    HomePage.prototype.pageScroller = function () {
        //scroll to page top
        this.pageTop.scrollToTop(500);
    };
    HomePage.prototype.editarPerfil = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__perfil_perfil__["a" /* PerfilPage */], { edit: true });
    };
    HomePage.prototype.getTrustImg = function () {
        console.log('imgSrc', this.imgSrc);
        if (this.imgSrc != 'assets/imgs/perfil-none.png') {
            var path = this.win.Ionic.WebView.convertFileSrc(this.imgSrc);
            console.log(path);
            return path;
        }
        else {
            return this.imgSrc;
        }
    };
    HomePage.prototype.mostrarFotoPerfil = function () {
        var _this = this;
        this.storage.get('photo_perfil').then(function (foto) {
            console.log('foto', foto);
            if (foto) {
                _this.imgSrc = foto;
            }
            else {
                _this.storage.get('fbId').then(function (id) {
                    if (id != null) {
                        _this.imgSrc = "https://graph.facebook.com/" + id + "/picture?type=large&width=90&height=90";
                    }
                    else {
                        _this.imgSrc = "../../assets/imgs/perfil-none.png";
                    }
                });
            }
        });
    };
    HomePage.prototype.onInput = function (ev) {
        //console.log('entreeeeeeee' , ev.target.value);   
        var val = ev.target.value.trim();
        if (val.length >= 1) {
            console.log('val', val);
            this.localesPrev2 = this.localesPrev2.filter(function (item) {
                //console.log('itemSearch', item);
                return (item['nombre'].toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
            //console.log(this.localesPrev2);
        }
        else {
            this.localesPrev2 = this.localesPrev;
        }
    };
    HomePage.prototype.getCurrentPosition = function () {
        var _this = this;
        this.geo.getCurrentPosition().then(function (pos) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.location.lat = pos.coords.latitude;
                        this.location.lng = pos.coords.longitude;
                        console.log('position', this.location);
                        return [4 /*yield*/, this.getLocales()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    HomePage.prototype.ionViewWillEnter = function () {
        console.log('imgSrc', this.imgSrc);
        this.getCurrentPosition();
        this.mostrarFotoPerfil();
    };
    HomePage.prototype.getLocales = function () {
        var _this = this;
        var dia = new Date();
        var hoy = dia.getDay();
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Espere por favor...'
        });
        loading.present();
        this.services.getLocales().subscribe(function (x) {
            _this.infoLocales = JSON.parse(x['_body'])['data'];
            _this.localesPrev = JSON.parse(_this.infoLocales)['stores'];
            _this.localesPrev.map(function (x) {
                if (x.horarios.length == 0) {
                    x.hora_apertura = "No Abre";
                }
                else {
                    x.horarios.map(function (y) {
                        if (y.dia == hoy) {
                            x.hora_apertura = "Abre " + y.horadesde + " hrs";
                        }
                    });
                }
                x.distance = "Calculando...";
                var service = new google.maps.DistanceMatrixService;
                service.getDistanceMatrix({
                    origins: [_this.location],
                    destinations: [x.direccion],
                    travelMode: 'DRIVING',
                    unitSystem: google.maps.UnitSystem.Metric,
                    avoidHighways: false,
                    avoidTolls: false
                }, function (response, status) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                if (!(status !== 'OK')) return [3 /*break*/, 1];
                                alert('Error was: ' + status);
                                x.distance = "Nan";
                                return [3 /*break*/, 5];
                            case 1:
                                //console.log('data',response)
                                //console.log('respuesta', response['rows'][0]['elements'][0]['distance']['text']);
                                _a = x;
                                return [4 /*yield*/, response['rows'][0]['elements'][0]['distance']['text']];
                            case 2:
                                //console.log('data',response)
                                //console.log('respuesta', response['rows'][0]['elements'][0]['distance']['text']);
                                _a.distance = _d.sent();
                                _b = x;
                                return [4 /*yield*/, response['rows'][0]['elements'][0]['duration']['text']];
                            case 3:
                                _b.duration = _d.sent();
                                _c = x;
                                return [4 /*yield*/, response['rows'][0]['elements'][0]['duration']['value']];
                            case 4:
                                _c.distanceVal = _d.sent();
                                _d.label = 5;
                            case 5:
                                setTimeout(function () {
                                    _this.ordenar();
                                    loading.dismiss();
                                }, 1000);
                                return [2 /*return*/];
                        }
                    });
                }); }); //Aca termina de resolver una distancia
            });
            _this.services.localesMap = _this.localesPrev;
            console.log(_this.localesPrev);
        });
    };
    HomePage.prototype.ordenar = function () {
        this.localesPrev2 = this.localesPrev.sort(function (a, b) {
            //console.log(a.nombre + " - "+ a.distance+ " - "+ b.nombre + " - "+b.distance+ "&")
            if (a.distanceVal > b.distanceVal) {
                return 1;
            }
            if (a.distanceVal < b.distanceVal) {
                return -1;
            }
            return 0;
        });
    };
    HomePage.prototype.goToIntLocal = function (local) {
        console.log('local', local);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__int_local_int_local__["a" /* IntLocalPage */], local);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["_8" /* ViewChild */])('pageTop'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* Content */])
    ], HomePage.prototype, "pageTop", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/home/home.html"*/'<ion-header no-shadow>\n  <ion-navbar no-border hideBackButton>\n    <ion-row>\n      <ion-col></ion-col>\n      <ion-col (click)="pageScroller()">\n        <ion-title text-center>\n          <img style="max-width: 40% !important;" src="../../assets/imgs/icono-er.svg">\n        </ion-title>\n      </ion-col>\n      <ion-col (click)="editarPerfil()">\n        <ion-buttons end>\n          <!-- <img *ngIf="foto_perfil" class="imgPerfil" style="max-width: 40% !important;" [src]="imgSrc"> -->          \n          <img class="imgPerfil" style="max-width: 40% !important;" [src]="getTrustImg()">\n        </ion-buttons>\n      </ion-col>\n    </ion-row>\n  </ion-navbar>\n</ion-header>\n\n<ion-content parallax-header has-bouncing="true" #pageTop>\n  <div class="header-image">\n    <ion-searchbar\n      placeholder="Busca tu mejor lugar"\n      [(ngModel)]="myInput"\n      [showCancelButton]="shouldShowCancel"\n      (ionInput)="onInput($event)"\n      (ionCancel)="onCancel($event)">\n    </ion-searchbar>\n  </div>\n\n  <div class="main-content">\n    <ion-list style="margin-top: 10px !important;" >\n      <ion-card (click)=goToIntLocal(local) *ngFor="let local of localesPrev2">\n        <div class="tienda-bg">\n          <img class="firstImg" src="{{url+local.foto}}"/>\n        </div>\n        <ion-item>\n          <ion-avatar item-start>\n            <img src="{{url+local.foto}}">\n          </ion-avatar>\n          <ion-badge item-end>\n            {{local.hora_apertura}}\n          </ion-badge>\n        </ion-item>\n        <ion-card-content>\n          <ion-card-title>\n            {{local.nombre}}\n            </ion-card-title>\n          <p>\n            <ion-icon name="pin"></ion-icon>  {{local.direccion}}\n          </p>\n          <p>\n            <ion-icon name="car"></ion-icon> Estas a {{local.distance}} - {{local.duration}}\n          </p>\n        </ion-card-content>\n      </ion-card>\n    </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_services_services__["a" /* ServicesProvider */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_0__ionic_storage__["b" /* Storage */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntLocalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__my_popover_my_popover__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eventos_local_eventos_local__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__perfil_perfil__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var IntLocalPage = /** @class */ (function () {
    function IntLocalPage(navCtrl, navParams, storage, popoverCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.popoverCtrl = popoverCtrl;
        this.win = window;
        this.visible = false;
        this.expanded = true;
        this.url = "http://estareservado.ctrlztest.com.ar/";
        this.horarios = [];
        this.data = false;
        this.info = this.navParams.data;
        this.localName = this.info['nombre'];
        console.log('infoLocal', this.info);
    }
    IntLocalPage.prototype.getTrustImg = function () {
        if (this.imgSrc != 'assets/imgs/perfil-none.png') {
            var path = this.win.Ionic.WebView.convertFileSrc(this.imgSrc);
            console.log(path);
            return path;
        }
        else {
            return this.imgSrc;
        }
    };
    IntLocalPage.prototype.presentPopover = function (event) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_0__my_popover_my_popover__["a" /* MyPopoverPage */], this.info, { showBackdrop: true, cssClass: "custom-popover" });
        popover.present({
            ev: event,
        });
    };
    IntLocalPage.prototype.editarPerfil = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__perfil_perfil__["a" /* PerfilPage */]);
    };
    IntLocalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IntLocalPage');
        this.loadMap();
    };
    IntLocalPage.prototype.ionViewWillEnter = function () {
        this.mostrarFotoPerfil();
    };
    IntLocalPage.prototype.mostrarFotoPerfil = function () {
        var _this = this;
        this.storage.get('photo_perfil').then(function (foto) {
            if (foto) {
                _this.imgSrc = foto;
            }
            else {
                _this.storage.get('fbId').then(function (id) {
                    if (id != null) {
                        _this.imgSrc = "https://graph.facebook.com/" + id + "/picture?type=large&width=90&height=90";
                    }
                    else {
                        _this.imgSrc = "../../assets/imgs/perfil-none.png";
                    }
                });
            }
        });
    };
    IntLocalPage.prototype.goToEvents = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__eventos_local_eventos_local__["a" /* EventosLocalPage */], this.info);
    };
    IntLocalPage.prototype.expandItem = function (horarios) {
        var _this = this;
        if (horarios.length == 0) {
            this.data = true;
        }
        else {
            this.data = false;
            this.horarios = horarios.map(function (horario) {
                switch (horario['dia']) {
                    case "7":
                        return { dia: "Domingo", desde: _this.recortar(horario['horadesde']), hasta: _this.recortar(horario['horahasta']) };
                    case "1":
                        return { dia: "Lunes", desde: _this.recortar(horario['horadesde']), hasta: _this.recortar(horario['horahasta']) };
                    case "2":
                        return { dia: "Martes", desde: _this.recortar(horario['horadesde']), hasta: _this.recortar(horario['horahasta']) };
                    case "3":
                        return { dia: "Miércoles", desde: _this.recortar(horario['horadesde']), hasta: _this.recortar(horario['horahasta']) };
                    case "4":
                        return { dia: "Jueves", desde: _this.recortar(horario['horadesde']), hasta: _this.recortar(horario['horahasta']) };
                    case "5":
                        return { dia: "Viernes", desde: _this.recortar(horario['horadesde']), hasta: _this.recortar(horario['horahasta']) };
                    case "6":
                        return { dia: "Sábados", desde: _this.recortar(horario['horadesde']), hasta: _this.recortar(horario['horahasta']) };
                }
            });
            console.log('horarios', this.horarios);
        }
        setTimeout(function () {
            _this.expanded = !_this.expanded;
            _this.visible = !_this.visible;
        }, 100);
    };
    IntLocalPage.prototype.recortar = function (hora) {
        var horasplit = hora.split(":");
        return horasplit[0] + ":" + horasplit[1];
    };
    IntLocalPage.prototype.loadMap = function () {
        //create a new map by passing HTMLElement
        var mapEle = document.getElementById('map');
        //Map options
        var options = {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            streetViewControl: true,
            disableDefaultUI: true,
        };
        //create map
        this.map = new google.maps.Map(mapEle, options);
        var geocoder = new google.maps.Geocoder();
        var infowindow = new google.maps.InfoWindow();
        this.geocodeAddress(geocoder, this.map, infowindow);
    };
    IntLocalPage.prototype.geocodeAddress = function (geocoder, resultMap, infowindow) {
        var address = this.info['direccion'];
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === 'OK') {
                resultMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: resultMap,
                    position: results[0].geometry.location
                });
                infowindow.setContent(address);
                infowindow.open(resultMap, marker);
            }
            else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_core__["t" /* ElementRef */])
    ], IntLocalPage.prototype, "mapRef", void 0);
    IntLocalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-int-local',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/int-local/int-local.html"*/'<ion-header no-border no-shadow>\n  <ion-navbar no-border no-shadow hideBackButton>\n    <ion-row>\n      <ion-col>\n        <button style="background-color: transparent !important;border-radius: 0px !important; box-shadow: none !important;" ion-button navPop icon-only>\n          <ion-icon name="appname-back"></ion-icon>\n		    </button>\n      </ion-col>\n      <ion-col>\n        <ion-title text-center>\n          <img style="max-width: 40% !important;" src="../../assets/imgs/icono-er.svg">\n        </ion-title>\n      </ion-col>\n      <ion-col (click)="editarPerfil()">\n        <ion-buttons end>\n          <img class="imgPerfil" style="max-width: 40% !important;" [src]="getTrustImg(imgSrc)">\n        </ion-buttons>\n      </ion-col>\n    </ion-row>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-card style="width: 100% !important; margin: 0px !important;">\n    <div class="tienda-bg">\n      <img src="{{url+info.foto}}"/>\n    </div>\n    <ion-item no-lines>\n      <ion-icon color="colorIcon" item-start name="pin"></ion-icon> Distancia: {{info.distance}}\n    </ion-item>\n    <ion-item (click)="expandItem(info.horarios)"> \n      <ion-icon color="colorIcon" item-start name="alarm"></ion-icon>\n      <span>Ver Horarios</span>\n      <ion-icon color="colorIcon" item-end [name]="\'arrow-dropdown\'"></ion-icon>\n    </ion-item>\n  </ion-card>\n  <ion-card style="margin: 10px !important;" *ngIf="!expanded">\n    <ion-card-header text-center>\n      Horarios\n    </ion-card-header>\n    <ion-card-content>\n      <p padding *ngIf="data" text-center>Sin horarios agregados!</p>\n      <ion-list *ngIf="!data">\n        <ion-row *ngFor="let hora of horarios">\n          <ion-col col-4>\n            <p text-center>{{hora.dia}}</p>\n          </ion-col>\n          <ion-col col-8>\n            <p text-right>{{hora.desde}} - {{hora.hasta}}</p> \n          </ion-col>\n        </ion-row>\n      </ion-list>\n    </ion-card-content>\n  </ion-card>\n  <ion-card style="margin: 10px !important;">\n    <ion-card-header>\n      <p text-center text-wrap>{{info.descripcion}}</p>\n    </ion-card-header>\n    <ion-card-content>\n      <button (click)="goToEvents()" style="background-color: #0173b1; height: 40px;" ion-button full round>Eventos</button>\n    </ion-card-content>\n  </ion-card>\n  <ion-row justify-content-center>\n    <ion-item no-lines>\n      <p text-wrap text-center>\n        <ion-icon color="colorIcon" item-start name="pin"></ion-icon> {{info.direccion}}\n      </p>\n    </ion-item>\n  </ion-row>\n  <ion-row style = "width: 100%; height: 50%;">\n    <div #map id="map"></div>\n  </ion-row>\n</ion-content>\n\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/int-local/int-local.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* PopoverController */]])
    ], IntLocalPage);
    return IntLocalPage;
}());

//# sourceMappingURL=int-local.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventosLocalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__int_evento_int_evento__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_services_services__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__perfil_perfil__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var EventosLocalPage = /** @class */ (function () {
    function EventosLocalPage(navCtrl, navParams, services, loadingCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.services = services;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.win = window;
        this.infoEventos = [];
        this.eventos = [];
        this.listaFechas = [];
        this.mostrarmsj = false;
        this.url = "http://estareservado.ctrlztest.com.ar/";
        this.info = this.navParams.data;
        console.log('data', this.info);
        this.nombreLocal = this.info['nombre'];
        this.direccion = this.info['direccion'];
        this.getEventos();
    }
    EventosLocalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EventosLocalPage');
    };
    EventosLocalPage.prototype.pageScroller = function () {
        //scroll to page top
        this.pageTop.scrollToTop(500);
    };
    EventosLocalPage.prototype.editarPerfil = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__perfil_perfil__["a" /* PerfilPage */]);
    };
    EventosLocalPage.prototype.getTrustImg = function () {
        if (this.imgSrc != 'assets/imgs/perfil-none.png') {
            var path = this.win.Ionic.WebView.convertFileSrc(this.imgSrc);
            console.log(path);
            return path;
        }
        else {
            return this.imgSrc;
        }
    };
    EventosLocalPage.prototype.mostrarFotoPerfil = function () {
        var _this = this;
        this.storage.get('photo_perfil').then(function (foto) {
            if (foto) {
                _this.imgSrc = foto;
            }
            else {
                _this.storage.get('fbId').then(function (id) {
                    if (id != null) {
                        _this.imgSrc = "https://graph.facebook.com/" + id + "/picture?type=large&width=90&height=90";
                    }
                    else {
                        _this.imgSrc = "../../assets/imgs/perfil-none.png";
                    }
                });
            }
        });
    };
    EventosLocalPage.prototype.ionViewWillEnter = function () {
        this.mostrarFotoPerfil();
    };
    EventosLocalPage.prototype.getEventos = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Espere por favor...'
        });
        loading.present();
        this.services.getEventosLocal(this.info['id']).subscribe(function (x) {
            _this.infoEventos = JSON.parse(x['_body'])['data'];
            _this.eventos = JSON.parse(_this.infoEventos)['evento'];
            _this.sinEventos(_this.eventos);
            _this.procesarLista();
            loading.dismiss();
            console.log('eventos', _this.eventos);
        });
    };
    EventosLocalPage.prototype.sinEventos = function (eventos) {
        if (eventos.length === 0) {
            this.mostrarmsj = true;
        }
        else {
            this.mostrarmsj = false;
        }
    };
    EventosLocalPage.prototype.procesarLista = function () {
        var _this = this;
        var fechaVieja = "";
        var items = {};
        this.eventos.map(function (x) {
            console.log('e', x.fechaevento);
            if (x.fechaevento !== fechaVieja) {
                if (fechaVieja !== "") {
                    _this.listaFechas.push(items);
                }
                items = {};
                fechaVieja = x.fechaevento;
                items['fecha'] = fechaVieja;
                items['listaEventos'] = [];
                items['listaEventos'].push(x);
            }
            else {
                items['listaEventos'].push(x);
            }
        });
        this.listaFechas.push(items);
        console.log(this.listaFechas);
    };
    EventosLocalPage.prototype.cortarCaracteres = function (frase) {
        var resultado;
        if (frase.length >= 20) {
            resultado = frase.substring(0, 20);
            return resultado + ' ...';
        }
        else {
            resultado = frase;
            return resultado;
        }
    };
    EventosLocalPage.prototype.dia = function (fecha) {
        var day = fecha.split("-").reverse();
        return day[0] + '-' + day[1] + '-' + day[2];
    };
    EventosLocalPage.prototype.goToIntEvent = function (evento) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__int_evento_int_evento__["a" /* IntEventoPage */], { event: evento, localName: this.nombreLocal });
    };
    EventosLocalPage.prototype.mostrarDia = function (fecha) {
        var date = new Date(fecha);
        var dia = date.getDay() + 1 > 31 ? date.getDay() : date.getDay() + 1;
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
        return day;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_8" /* ViewChild */])('pageTop'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* Content */])
    ], EventosLocalPage.prototype, "pageTop", void 0);
    EventosLocalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-eventos-local',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/eventos-local/eventos-local.html"*/'<ion-header no-border no-shadow>\n  <ion-navbar no-border no-shadow hideBackButton>\n    <ion-row>\n      <ion-col>\n        <button style="background-color: transparent !important;border-radius: 0px !important; box-shadow: none !important;" ion-button navPop icon-only>\n          <ion-icon name="appname-back"></ion-icon>\n		    </button>\n      </ion-col>\n      <ion-col (click)="pageScroller()">\n        <ion-title text-center>\n          <img class="header" style="max-width: 40% !important;" src="../../assets/imgs/icono-er.svg">\n        </ion-title>\n      </ion-col>\n      <ion-col (click)="editarPerfil()">\n        <ion-buttons end>\n          <img class="imgPerfil" style="max-width: 40% !important;" [src]="getTrustImg(imgSrc)">\n        </ion-buttons>\n      </ion-col>\n    </ion-row>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content #pageTop>\n  <div class="header-image" (click)="pageScroller()">\n    Eventos - {{nombreLocal}}\n  </div>\n  <ion-row *ngIf="mostrarmsj" justify-content-center>\n    <h5 padding text-center text-wrap style="text-align: center;">No hay eventos agregados en este Local!</h5>\n  </ion-row>\n  <div *ngIf="eventos.length > 0">\n    <ion-list *ngFor="let fechas of listaFechas">\n      <ion-list-header text-center style="margin-bottom: 0px !important;">\n        {{mostrarDia(fechas.fecha)}} {{dia(fechas.fecha)}}\n      </ion-list-header>    \n      <ion-item *ngFor="let evento of fechas.listaEventos" (click)=goToIntEvent(evento)>\n        <ion-thumbnail item-start>\n          <img class="list" src="{{url+evento.foto}}">\n        </ion-thumbnail>\n        <div>{{evento.nombre}}</div>\n        <div class="item-description">\n          <ion-icon name="time"></ion-icon>  {{evento.horadesde}} - {{evento.horahasta}}\n        </div>\n        <div *ngIf="!(evento.precio == 0)" class="item-description" style="margin-top: 5px;">\n          <ion-icon name="cash"></ion-icon>  ${{evento.precio}}\n        </div>\n        <div *ngIf="(evento.precio == 0)" class="item-description" style="margin-top: 5px;">\n          <ion-icon name="cash"></ion-icon>  Gratis!\n        </div>\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/eventos-local/eventos-local.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__providers_services_services__["a" /* ServicesProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], EventosLocalPage);
    return EventosLocalPage;
}());

//# sourceMappingURL=eventos-local.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(254);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_terminos_terminos__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_my_popover_my_popover__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_change_pass_change_pass__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_confirm_reserva_confirm_reserva__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_int_evento_int_evento__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_int_local_int_local__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_reservas_reservas__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_map_map__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_info_slide_info_slide__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_status_bar__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__app_component__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_home_home__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_perfil_perfil__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_tabs_tabs__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_services_services__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_common_http__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_http__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_eventos_local_eventos_local__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_confirm_confirm__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_launch_navigator__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_geolocation__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_ngx_qrcode2__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_qr_data_qr_data__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_facebook__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_camera__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_in_app_browser__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_crop__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_base64__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_image_picker__ = __webpack_require__(225);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_11__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_16__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_info_slide_info_slide__["a" /* InfoSlidePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_perfil_perfil__["a" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_reservas_reservas__["a" /* ReservasPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_int_local_int_local__["a" /* IntLocalPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_eventos_local_eventos_local__["a" /* EventosLocalPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_int_evento_int_evento__["a" /* IntEventoPage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_confirm_reserva_confirm_reserva__["a" /* ConfirmReservaPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_confirm_confirm__["a" /* ConfirmPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_qr_data_qr_data__["a" /* QrDataPage */],
                __WEBPACK_IMPORTED_MODULE_2__pages_change_pass_change_pass__["a" /* ChangePassPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_my_popover_my_popover__["a" /* MyPopoverPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_terminos_terminos__["a" /* TerminosPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_10__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_20__angular_common_http__["a" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_21__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_12_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* MyApp */], {
                    backButtonText: '',
                    backButtonIcon: 'md-arrow-back',
                    iconMode: 'ios',
                    modalEnter: 'modal-slide-in',
                    modalLeave: 'modal-slide-out',
                    tabsPlacement: 'bottom',
                    pageTransition: 'ios-transition'
                }, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_28__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_26_ngx_qrcode2__["a" /* NgxQRCodeModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_12_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_16__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_info_slide_info_slide__["a" /* InfoSlidePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_perfil_perfil__["a" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_reservas_reservas__["a" /* ReservasPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_int_local_int_local__["a" /* IntLocalPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_eventos_local_eventos_local__["a" /* EventosLocalPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_int_evento_int_evento__["a" /* IntEventoPage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_confirm_reserva_confirm_reserva__["a" /* ConfirmReservaPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_confirm_confirm__["a" /* ConfirmPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_qr_data_qr_data__["a" /* QrDataPage */],
                __WEBPACK_IMPORTED_MODULE_2__pages_change_pass_change_pass__["a" /* ChangePassPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_my_popover_my_popover__["a" /* MyPopoverPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_terminos_terminos__["a" /* TerminosPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_launch_navigator__["a" /* LaunchNavigator */],
                __WEBPACK_IMPORTED_MODULE_29__ionic_native_facebook__["a" /* Facebook */],
                __WEBPACK_IMPORTED_MODULE_30__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_34__ionic_native_image_picker__["a" /* ImagePicker */],
                __WEBPACK_IMPORTED_MODULE_32__ionic_native_crop__["a" /* Crop */],
                __WEBPACK_IMPORTED_MODULE_33__ionic_native_base64__["a" /* Base64 */],
                __WEBPACK_IMPORTED_MODULE_31__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                { provide: __WEBPACK_IMPORTED_MODULE_11__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_12_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_19__providers_services_services__["a" /* ServicesProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_tabs_tabs__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_login_login__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, storage) {
        var _this = this;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.overlaysWebView(true);
            statusBar.backgroundColorByHexString('#259ea6');
            //statusBar.styleDefault();
            splashScreen.hide();
            storage.get('dataUsuario').then(function (val) {
                if (val != 0) {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_0__pages_tabs_tabs__["a" /* TabsPage */];
                    //this.nav.setRoot(TabsPage);
                }
                else {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_1__pages_login_login__["a" /* LoginPage */];
                }
            });
        });
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", Object)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PerfilPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_login__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__terminos_terminos__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_services_services__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__info_slide_info_slide__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_crop__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_base64__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_image_picker__ = __webpack_require__(225);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var PerfilPage = /** @class */ (function () {
    function PerfilPage(navCtrl, navParams, toastCtrl, service, menuCtrl, app, _formBuilder, storage, platform, crop, base64, sanitizer, camera, picker) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.service = service;
        this.menuCtrl = menuCtrl;
        this.app = app;
        this._formBuilder = _formBuilder;
        this.storage = storage;
        this.platform = platform;
        this.crop = crop;
        this.base64 = base64;
        this.sanitizer = sanitizer;
        this.camera = camera;
        this.picker = picker;
        this.registerForm = new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["b" /* FormGroup */]({});
        this.win = window;
        this.user = {
            nombre: '',
            apellido: '',
            email: '',
            telefono: '',
            dni: '',
            nacimiento: '',
            pass: '',
            repetirPass: '',
        };
        this.userName = "";
        this.userEmail = "";
        this.showMsgError = false;
        this.msgError = "";
        this.data = [];
        this.cambioBtn1 = false;
        this.cambioBtn2 = false;
        this.cambioBtn3 = false;
        this.imgSrc = "../../assets/imgs/perfil-none.png";
        this.dataUsuario = [];
        this.perfil_photo = false;
        this.checkTerminos = false;
        this.foto_perfil = false;
        this.imagePath = 'assets/imgs/perfil-none.png';
    }
    PerfilPage.prototype.getTrustImg = function () {
        console.log('fn_muestra', this.imagePath);
        if (this.imagePath != 'assets/imgs/perfil-none.png') {
            var path = this.win.Ionic.WebView.convertFileSrc(this.imagePath);
            console.log('fn_muestra_path', path);
            return path;
        }
        else {
            return this.imagePath;
        }
    };
    PerfilPage.prototype.cropPicture = function (path) {
        var _this = this;
        console.log('path_crop', path);
        var option = {
            quality: 100,
            targetHeight: 100,
            targetWidth: 100
        };
        this.crop.crop(path, option).then(function (newImageCrop) {
            _this.imagePath = newImageCrop;
            console.log('imagen_cropeanda', newImageCrop);
            _this.toBase64(newImageCrop);
        }, function (error) {
            console.log('error_Crop', error);
        });
    };
    PerfilPage.prototype.ngOnInit = function () {
        this.formMail = this._formBuilder.group({
            clientEmail: [
                "",
                [
                    __WEBPACK_IMPORTED_MODULE_7__angular_forms__["g" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_7__angular_forms__["g" /* Validators */].pattern("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")
                ]
            ]
        });
    };
    PerfilPage.prototype.ionViewWillEnter = function () {
        console.log('dataUser', this.navParams.data);
        this.mostrarFotoPerfil();
        if (this.navParams.data['fbId']) {
            console.log('1');
            this.fbId = this.navParams.data['fbId'];
            this.storage.set('fbId', this.fbId);
            this.imgSrc = "https://graph.facebook.com/" + this.fbId + "/picture?type=large&width=90&height=90";
            this.userName = this.user.nombre = this.navParams.data['name'];
            this.userEmail = this.user.email = this.navParams.data['email'];
            this.cambioBtn2 = true;
        }
        if (!this.navParams.data.edit) {
            console.log('3');
            this.cambioBtn1 = true;
            this.cambioBtn3 = false;
        }
        else {
            this.getDataUser();
            console.log(this.dataUsuario.length);
            this.cambioBtn3 = true;
        }
    };
    PerfilPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PerfilPage');
    };
    PerfilPage.prototype.changeName = function (e) {
        this.userName = this.user.nombre.charAt(0).toUpperCase() + this.user.nombre.slice(1);
    };
    PerfilPage.prototype.changeLastName = function (e) {
        this.apellido = this.user.apellido.charAt(0).toUpperCase() + this.user.apellido.slice(1);
    };
    PerfilPage.prototype.changeEmail = function (e) {
        this.userEmail = this.user.email.toLowerCase();
    };
    PerfilPage.prototype.mostrarFotoPerfil = function () {
        var _this = this;
        this.storage.get('photo_perfil').then(function (foto) {
            if (foto) {
                _this.imagePath = foto;
            }
            else {
                _this.storage.get('fbId').then(function (id) {
                    if (id != null) {
                        _this.imagePath = "https://graph.facebook.com/" + id + "/picture?type=large&width=90&height=90";
                    }
                    else {
                        _this.imagePath = "../../assets/imgs/perfil-none.png";
                    }
                });
            }
        });
    };
    PerfilPage.prototype.sevePerfilconFb = function () {
        var _this = this;
        if (this.validacion()) {
            this.storage.set('dataUser', this.user);
            this.service.createUserFB(this.user, this.fbId, this.base64Image).subscribe(function (x) {
                console.log('dataCreateUser', JSON.parse(x['_body']));
                _this.storage.set('photo_perfil', _this.imagePath);
                _this.data = JSON.parse(x['_body']);
                if (_this.data['data']) {
                    _this.storage.set('userId', _this.data['data']);
                    _this.dataUsuario = [];
                    _this.toastExito();
                    setTimeout(function () {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__info_slide_info_slide__["a" /* InfoSlidePage */]);
                    }, 1500);
                }
                else {
                    _this.msgError = 'Hubo un error, vuelve a intentarlo mas tarde por favor!';
                    _this.toastError();
                }
            });
        }
        else {
            this.toastError();
        }
    };
    PerfilPage.prototype.emailIsValid = function (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    PerfilPage.prototype.actualizarUser = function () {
        var _this = this;
        //this.validacion();
        this.storage.get('userId').then(function (id) {
            console.log('id', id);
            if (id && _this.validacion()) {
                _this.service.updateUser(id, _this.user, _this.base64Image).subscribe(function (x) {
                    _this.storage.set('photo_perfil', _this.imagePath);
                    console.log('dataCreateUser', JSON.parse(x['_body']));
                    _this.data = JSON.parse(x['_body'])['data'];
                    if (_this.data) {
                        _this.toastExito();
                        setTimeout(function () {
                            _this.navCtrl.pop();
                        }, 1000);
                    }
                    else {
                        _this.msgError = 'Oh no! \n Hubo un error, vuelve a intentarlo más tarde por favor!';
                        _this.toastError();
                    }
                });
            }
            else {
                _this.toastError();
            }
        });
    };
    PerfilPage.prototype.savePerfil = function () {
        var _this = this;
        console.log('user', this.user);
        if (this.validacion()) {
            this.storage.set('dataUser', this.user);
            this.service.createUser(this.user, this.base64Image).subscribe(function (x) {
                console.log('dataCreateUser', JSON.parse(x['_body']));
                _this.storage.set('photo_perfil', _this.imagePath);
                _this.data = JSON.parse(x['_body']);
                if (_this.data['data']) {
                    _this.storage.set('userId', _this.data['data']);
                    _this.toastExito();
                    _this.dataUsuario = [];
                    setTimeout(function () {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__info_slide_info_slide__["a" /* InfoSlidePage */]);
                    }, 1500);
                }
                else {
                    _this.msgError = 'Oh no! \n Hubo un error, vuelve a intentarlo más tarde por favor!';
                    _this.toastError();
                }
            });
        }
        else {
            this.toastError();
        }
        //this.navCtrl.push(TabsPage);
    };
    PerfilPage.prototype.selected = function (event) {
        this.checkTerminos = !this.checkTerminos;
    };
    PerfilPage.prototype.addPerfilPhoto = function () {
        var _this = this;
        var options = {
            mediaType: this.camera.MediaType.ALLMEDIA,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: this.camera.EncodingType.JPEG,
            allowEdit: true,
        };
        this.camera.getPicture(options)
            .then(function (fileUri) {
            console.log('fileUri_camara', fileUri);
            // Crop Image, on android this returns something like, '/storage/emulated/0/Android/...'
            // Only giving an android example as ionic-native camera has built in cropping ability
            if (_this.platform.is('ios')) {
                return fileUri;
            }
            else if (_this.platform.is('android')) {
                // Modify fileUri format, may not always be necessary
                fileUri = 'file://' + fileUri;
                /* Using cordova-plugin-crop starts here */
                _this.cropPicture(fileUri);
            }
        });
    };
    PerfilPage.prototype.toBase64 = function (filePath) {
        var _this = this;
        this.base64.encodeFile(filePath).then(function (base64File) {
            _this.base64Image = base64File;
        });
    };
    PerfilPage.prototype.validacion = function () {
        var ret = true;
        var msg = this.msgError = "";
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
            msg += "Debe completar el telefono \n";
        }
        if (this.user.dni == "" && this.user.dni.length == 7) {
            ret = false;
            msg += "Debes ingresar un DNI correcto \n";
        }
        if (this.user.nacimiento == "") {
            ret = false;
            msg += "Debe completar la fecha de nacimiento \n";
        }
        else {
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
    };
    PerfilPage.prototype.toastExito = function () {
        var toast = this.toastCtrl.create({
            message: 'Listo! \n Te has registrado con éxito!',
            duration: 2000,
            position: 'top',
            cssClass: 'toastExito'
        });
        toast.present();
    };
    PerfilPage.prototype.toastError = function () {
        var toast = this.toastCtrl.create({
            message: this.msgError,
            showCloseButton: true,
            closeButtonText: "X",
            duration: 2000,
            position: 'top',
            cssClass: 'toastError'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    PerfilPage.prototype.getDataUser = function () {
        var _this = this;
        this.storage.get('userId').then(function (id) {
            console.log('idUser', id);
            _this.service.getDataUser(id).subscribe(function (data) {
                console.log('dataUsuario', JSON.parse(data['_body']));
                _this.dataUsuario = JSON.parse(data['_body'])['data'];
                _this.storage.set('dataUsuario', _this.dataUsuario);
                _this.cambioBtn3 = true;
                _this.userName = _this.user.nombre = _this.dataUsuario['name'].charAt(0).toUpperCase() + _this.dataUsuario['name'].slice(1);
                _this.userEmail = _this.user.email = _this.dataUsuario['email'];
                _this.user.apellido = _this.apellido = _this.dataUsuario['surname'].charAt(0).toUpperCase() + _this.dataUsuario['surname'].slice(1);
                _this.user.telefono = _this.dataUsuario['phone'];
                _this.user.dni = _this.dataUsuario['dni'];
                _this.user.nacimiento = _this.dataUsuario['birthdate'];
                _this.user.pass = _this.user.repetirPass = _this.dataUsuario['password'];
                _this.cambioBtn1 = false;
            });
        });
    };
    PerfilPage.prototype.goToTerminos = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__terminos_terminos__["a" /* TerminosPage */]);
    };
    PerfilPage.prototype.logOut = function () {
        this.storage.set('userId', 0);
        this.storage.set('dataUsuario', 0);
        this.menuCtrl.close();
        var nav = this.app.getRootNav();
        nav.setRoot(__WEBPACK_IMPORTED_MODULE_0__login_login__["a" /* LoginPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", Object)
    ], PerfilPage.prototype, "nav", void 0);
    PerfilPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-perfil',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/perfil/perfil.html"*/'<ion-header no-shadow no-border transparent>\n  <ion-navbar no-shadow no-border transparent>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-row style="margin-top: 7%;" justify-content-center>\n    <ion-col text-center col-6 no-padding>\n      <img *ngIf="cambioBtn2" text-center class="img_add" [src]="imgSrc">\n      <img *ngIf="!cambioBtn2" text-center class="img_add" [src]="getTrustImg(imagePath)">\n    </ion-col>\n    <ion-col col-6 no-padding>\n      <h4>{{userName}} {{apellido}}</h4>\n      <p>{{userEmail}}</p>\n    </ion-col>\n    <ion-col col-6 text-center no-padding class="col_add">\n      <span text-center><ion-icon ion-fab mini class="icon_add" name="add" (click)="addPerfilPhoto()"></ion-icon></span>\n    </ion-col>\n  </ion-row>\n  <ion-list id="cloud-lay" padding>\n    <ion-row style="height: 64%;">\n        <ion-item class="item_perfil">\n          <ion-label><ion-icon name="appname-username"></ion-icon></ion-label>\n          <ion-input text-right placeholder="Nombre" type="text" required [(ngModel)]="user.nombre" (ionChange)="changeName($event)"></ion-input>\n        </ion-item>    \n        <ion-item class="item_perfil">\n          <ion-label><ion-icon name="appname-username"></ion-icon></ion-label>\n          <ion-input text-right placeholder="Apellido" type="text" required [(ngModel)]="user.apellido" (ionChange)="changeLastName($event)"></ion-input>\n        </ion-item>\n        <form style="width: 100%!important;" [formGroup]="formMail" novalidate>\n        <ion-item class="item_perfil">\n          <ion-label><ion-icon name="appname-email"></ion-icon></ion-label>\n          <ion-input text-right placeholder="Email" formControlName="clientEmail" name="email" type="email" [(ngModel)]="user.email" (ionChange)="changeEmail($event)"></ion-input>\n        </ion-item>\n        </form>    \n        <ion-item class="item_perfil">\n          <ion-label><ion-icon name="appname-tel"></ion-icon></ion-label>\n          <ion-input text-right placeholder="Teléfono" type="number" required [(ngModel)]="user.telefono"></ion-input>\n        </ion-item>\n        <ion-item class="item_perfil">\n          <ion-label><ion-icon name="appname-dni"></ion-icon></ion-label>\n          <ion-input text-right placeholder="D.N.I" type="number" required [(ngModel)]="user.dni"></ion-input>\n        </ion-item>\n        <ion-item class="item_perfil">\n          <ion-label style="color: white;"><ion-icon name="appname-username"></ion-icon></ion-label>\n          <ion-datetime placeholder="Fecha de nacimiento" displayFormat="DD/MM/YYYY" cancelText="Cancelar" doneText="Ok" [(ngModel)]="user.nacimiento"></ion-datetime>\n        </ion-item>\n        <ion-item class="item_perfil">\n          <ion-label><ion-icon name="appname-username"></ion-icon></ion-label>\n          <ion-input text-right placeholder="Contraseña" type="password" required [(ngModel)]="user.pass"></ion-input>\n        </ion-item>\n        <ion-item class="item_perfil">\n          <ion-label><ion-icon name="appname-username"></ion-icon></ion-label>\n          <ion-input text-right placeholder="Repetir contraseña" type="password" required [(ngModel)]="user.repetirPass"></ion-input>\n        </ion-item>\n      </ion-row>\n      <ion-row *ngIf="!cambioBtn3" padding justify-content-center>\n        <ion-item style="padding-left: 50px !important; text-align: start;" no-lines>\n          <ion-label text-wrap style="font-size: 0.8em; color: #FFFFFF;">Acepto <a (click)="goToTerminos()">Términos y condiciones</a> de EstáReservado</ion-label>\n          <ion-checkbox style="margin: 9px !important;" color="secondary" (ionChange)="selected($event)"></ion-checkbox>\n        </ion-item>\n      </ion-row>\n      <ion-row *ngIf="cambioBtn1" justify-content-center style="margin-top:5%;">\n        <button class="continuar" style="font-size: 0.8em;" ion-button full round outline [disabled]="!formMail.valid && !checkTerminos" (click)="savePerfil()">Continuar</button>\n      </ion-row>\n      <ion-row *ngIf="cambioBtn2" justify-content-center style="margin-top:5%;">\n        <button class="continuar" style="font-size: 0.8em;" ion-button full round outline [disabled]="!formMail.valid && !checkTerminos" (click)="sevePerfilconFb()">Continuar</button>\n      </ion-row>\n      <ion-row *ngIf="cambioBtn3" justify-content-center style="margin-top:5%;">\n        <button class="continuar" style="font-size: 0.8em;" ion-button full round outline [disabled]="!formMail.valid" (click)="actualizarUser()">Guardar Cambios</button>\n      </ion-row>\n    </ion-list>\n    <!-- <ion-row justify-content-center>\n      <p text-center class="perfil-ft" (click)="goToTerminos()">Términos y Condiciones</p>\n    </ion-row> -->\n    <ion-row justify-content-center (click)="logOut()">\n      <p text-center class="perfil-ft" >Salir <span><ion-icon name="power"></ion-icon></span></p>\n    </ion-row>\n  </ion-content>\n\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/perfil/perfil.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_services_services__["a" /* ServicesProvider */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* App */],
            __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_crop__["a" /* Crop */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_base64__["a" /* Base64 */],
            __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_image_picker__["a" /* ImagePicker */]])
    ], PerfilPage);
    return PerfilPage;
}());

//# sourceMappingURL=perfil.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__map_map__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reservas_reservas__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(218);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__map_map__["a" /* MapPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__reservas_reservas__["a" /* ReservasPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabIcon="mascotas-luagres"></ion-tab>\n  <ion-tab [root]="tab2Root" tabIcon="mascotas-mapa"></ion-tab>\n  <ion-tab [root]="tab3Root" tabIcon="mascotas-reservas"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/EstaReservado/userReservado/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ })

},[233]);
//# sourceMappingURL=main.js.map