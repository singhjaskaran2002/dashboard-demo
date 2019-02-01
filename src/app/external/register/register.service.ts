import { host } from './../../common/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url = host;

  constructor(private http: HttpClient) { }

  register(userData) {
    return this.http.post<any>(this.url + '/user/register', userData);
  }

  verifyOtp(otpData) {
    return this.http.post<any>(this.url + '/otp/verify', otpData);
  }

  sendOtp(user) {
    return this.http.post<any>(this.url + '/user/generate/otp/', user);
  }
}
