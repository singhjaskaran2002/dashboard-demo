import { host } from './../../common/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = host;

  constructor(
    private http: HttpClient
  ) { }

  login(userData) {
    return this.http.post<any>(this.url + '/user/login', userData);
  }

  getByContact(contact) {
    return this.http.get<any>(this.url + '/user/get/detail/' + contact);
  }

  resetPass(data) {
    return this.http.put<any>(this.url + '/user/reset/password', data);
  }
  
}
