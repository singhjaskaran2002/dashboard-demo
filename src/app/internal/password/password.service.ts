import { host } from './../../common/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(
    private http: HttpClient
  ) {

  }

  updatePassword(data) {
    return this.http.put<any>(host + '/user/update/password', data);
  }
}
