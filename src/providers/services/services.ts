import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import { tap } from 'rxjs/operators/tap';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServicesProvider {

  localesMap:any=[];
  public _auth: Auth = new Auth();

  constructor(
    private http: Http,
    private storage: Storage,
  ) {
    console.log('Hello ServicesProvider Provider');
  }

  createUserFB(user,facebookid, foto){
    let url = "http://estareservado.ctrlztest.com.ar/crearusuario.php";
    
    var headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded');
    
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    
    const body = JSON.stringify({
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
    })

    return this.http.post(url, body, options).pipe(
      tap(x=>{
        console.log('dataLocales', x);
      })
    )
  }

  createUser(user, foto){
    console.log('userBACK', user.nombre);
    let url = "http://estareservado.ctrlztest.com.ar/crearusuario.php";
    
    var headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded');
    
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    
    const body = JSON.stringify({
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
    })

    console.log('body', body);
    return this.http.post(url, body, options).pipe(
      tap(x=>{
        console.log('dataLocales', x);
      })
    )
  }

  updateUser(id,user,foto){
    console.log('userBACK', id);
    let url = "http://estareservado.ctrlztest.com.ar/actualizarusuario.php";
    
    var headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded');
    
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    
    const body = JSON.stringify({
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
    })

    console.log('body', body);
    return this.http.post(url, body, options).pipe(
      tap(x=>{
        console.log('upadteUser', x);
      })
    )
  }

  updateImage(id,foto){
    console.log('userBACK', id);
    let url = "http://estareservado.ctrlztest.com.ar/actualizarimagen.php";
    
    var headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded');
    
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    
    const body = JSON.stringify({
      usuarioid: id,
      foto: foto
    })

    console.log('body', body);
    return this.http.post(url, body, options).pipe(
      tap(x=>{
        console.log('upadteImage', x);
      })
    )
  }

  validarUser(user){
    let url = "http://estareservado.ctrlztest.com.ar/validarusuarioadmin.php?usuario="+user.usuario+"&contrasenia="+user.password;
    
    var headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded');
    
    const requestOptions = new RequestOptions({ headers: headers });

    return this.http.get(url, requestOptions).pipe(
      tap(x=>{
        console.log('usuario', x);
        this.storage.set('userId',JSON.parse(x['_body'])['data']['usuarioid']);
        this.storage.set('photo_perfil', JSON.parse(x['_body'])['data']['foto'])
        this._auth.usuarioId = JSON.parse(x['_body'])['data']['usuarioid'];
      })
    )
  }

  getLocales(): Observable<any>{
    let url = "http://estareservado.ctrlztest.com.ar/traerlocales.php";
    
    var headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded');
    
    const requestOptions = new RequestOptions({ headers: headers });

    return this.http.get(url, requestOptions).pipe(
      tap(x=>{
        console.log('dataLocales', x);
      })
    )
  }

  getEventosLocal(id): Observable<any>{
    let url = "http://estareservado.ctrlztest.com.ar/traereventosxlocal.php?localid="+id;
    
    var headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded');
    
    const requestOptions = new RequestOptions({ headers: headers });

    return this.http.get(url, requestOptions).pipe(
      tap(x=>{
        console.log('eventos', x);
      })
    )
  }

  getDataUser(userId): Observable<any>{
    var headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded');
    
    const requestOptions = new RequestOptions({ headers: headers });

    return this.http.post('http://estareservado.ctrlztest.com.ar/traerperfilusuario.php?userid='+userId,{},requestOptions).pipe(
      tap(x=>{
        console.log('dataUser', x);
      })
    )
  }

  getReservasUser(userId): Observable<any>{
    var headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded');
    
    const requestOptions = new RequestOptions({ headers: headers });

    return this.http.post('http://estareservado.ctrlztest.com.ar/traermisreservas.php?usuarioid='+userId,{},requestOptions).pipe(
      tap(x=>{
        console.log('dataUser', JSON.parse(x['_body']));
      })
    )
  }

  validarFbId(facebookid){
    let url = "http://estareservado.ctrlztest.com.ar/validarusuario.php?facebookid="+facebookid;
    
    var headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded');
    
    const requestOptions = new RequestOptions({ headers: headers });

    return this.http.get(url, requestOptions).pipe(
      tap(x=>{
        console.log('usuario', x);
        this._auth.usuarioId = JSON.parse(x['_body'])['data']['usuarioid'];
      })
    )
  }

  recuperarPass(email){
    var headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded');
    
    const requestOptions = new RequestOptions({ headers: headers });

    return this.http.post('http://estareservado.ctrlztest.com.ar/recuperarpass.php?email='+email,{},requestOptions).pipe(
      tap(x=>{
        console.log('dataUser', x);
      })
    )
  }

  crearReserva(userId, eventoId,pago){
    let url = "http://estareservado.ctrlztest.com.ar/crearreserva.php";
    
    var headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded');
    
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    
    const body = JSON.stringify({
      usuarioid: userId,
      eventoid: eventoId,
      pago: pago
    })

    console.log('body', body);
    return this.http.post(url, body, options).pipe(
      tap(x=>{
        console.log('dataLocales', x);
      })
    )
  }

}

export class Auth{
  usuarioId:string;
}
