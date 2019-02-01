import { host } from './../../common/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = host;

  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this.http.get<any>(this.url + '/user/list');
  }

}
