import { host } from './../../common/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  url = host;

  constructor(
    private http: HttpClient
  ) { }

  get(email) {
    return this.http.post<any>(this.url + '/user/getUser', { email: email });
  }

  updateProfilePicture(data) {
    var formdata = new FormData();
    formdata.append('profilePicture', data.profilePicture);
    formdata.append('email', data.email);
    return this.http.post<any>(this.url + '/user/update/picture', formdata);
  }

  getProfilePicture(profilePicture) {
    return this.http.get<any>(this.url + '/user/get/picture/' + profilePicture);
  }
}
