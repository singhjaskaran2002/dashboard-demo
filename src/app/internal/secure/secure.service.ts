import { host } from './../../common/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecureService {

  constructor(
    private http: HttpClient
  ) { }

  deleteUser(email) {
    return this.http.get<any>(host + '/user/delete/' + email);
  }
}
