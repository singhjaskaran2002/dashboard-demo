import { host } from './../../common/config';
import { Lightbox } from 'ngx-lightbox';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: Array<any> = [];
  imageUrl;
  album;
  loggedUser;
  url = host;
  profilePicUrl;

  constructor(
    private dashboardService: DashboardService,
    private lighbox: Lightbox,
    private router: Router
  ) {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser')).email;
    this.imageUrl = this.url + '/user/get/picture';
  }

  ngOnInit() {
    this.album = [];
    this.dashboardService.getUsers().subscribe(res => {
      for (let i = 0; i < res.userlist.length; i++) {
        if (res.userlist[i].email !== this.loggedUser) {
          this.users.push(res.userlist[i]);
          const album = {
            src: this.url + '/user/get/picture/' + res.userlist[i].profilePicture,
            caption: res.userlist[i].username
          }
          this.album.push(album);
        }
      }
    });
  }

  ngDoCheck(): void {
  }

  chatClicked(recepientEmail, recepientName) {
    localStorage.setItem('recepientEmail', recepientEmail);
    localStorage.setItem('recepientName', recepientName);
    this.router.navigateByUrl('/internal/chat');
  }

  openImage(index) {
    this.lighbox.open(this.album, index);
  }

}
