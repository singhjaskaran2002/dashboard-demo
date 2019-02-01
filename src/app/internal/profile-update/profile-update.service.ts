import { host } from './../../common/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileUpdateService {

  url = host;

  constructor(
    private http: HttpClient
  ) { }

  updateProfile(data) {
    return this.http.put<any>(this.url + '/user/profile/update', data);
  }
}
