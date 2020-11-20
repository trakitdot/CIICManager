import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
//import { HTTP } from '@ionic-native/http/ngx';
//import { HttpClientModule } from  '@angular/common/http';
//import { HttpClient, Http, Headers, RequestOptions } from '@angular/common/http';
// import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//import { Headers, RequestOptions } from '@ionic-native/http/ngx';
//import 'rxjs/add/operator/map';

 
@Injectable({
  providedIn: 'root'
})
export class MySQLServiceService {
   server: string = `http://localhost/server_api/proses-api.php`;
  //server: string = "http://localhost/IONIC4_CRUD_LOGINREGIS_PHP_MYSQL/server_api/";  default
  // if you test in real device "http://localhost" change use the your IP	
  //server: string = "http://192.199.122.100/IONIC4_CRUD_LOGINREGIS_PHP_MYSQL/server_api/"; 

  constructor(public httpClient: HttpClient) {
    console.log(this.httpClient);
    
  }

  postData(body) {
    const options = {
      headers: new HttpHeaders(),
      params: new HttpParams()
    }
    return this.httpClient.post(this.server , JSON.stringify(body), options);
  }
  // postData(body, file){
  // 	let type = "application/json; charset=UTF-8";
  // 	let headers = new Headers({ 'Content-Type': type });
  // 	let options = new RequestOptions({ headers: headers });
/*      let body = {
        username: this.username,
        password: this.password,
        aksi: 'login'*/
  // 	return this.http.post(this.server + file, JSON.stringify(body), options)
  // 	.map(res => res.json());
  // }
}