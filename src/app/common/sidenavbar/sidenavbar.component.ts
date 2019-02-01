import { ToastrService } from 'ngx-toastr';
import { host } from './../config';
import { ProfileService } from './../../internal/profile/profile.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {

  dashboardClass;
  adminClass;
  profileClass;
  userLogged;
  admin;
  imageUrl;
  url = host;
  userLoggedEmail;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.dashboardClass = 'w3-bar-item w3-button';
    this.profileClass = 'w3-bar-item w3-button';
    this.adminClass = 'w3-bar-item w3-button';
  }

  // chatClicked(recepientEmail, recepientName) {
  //   localStorage.setItem('recepientEmail', recepientEmail);
  //   localStorage.setItem('recepientName', recepientName);
  //   this.router.navigateByUrl('/internal/chat');
  // }

  ngOnInit() {
    //  this.userOnlineFunction();
    this.userLoggedEmail = JSON.parse(localStorage.getItem('loggedUser')).email;
  }

  ngOnChanges() {
    // this.userOnlineFunction();
  }

  ngDoCheck() {
    if (window.location.pathname === '/internal/dashboard') {
      this.dashboardClass = 'w3-bar-item w3-button w3-white';
      this.profileClass = 'w3-bar-item w3-button';
      this.adminClass = 'w3-bar-item w3-button';
    }
    if (window.location.pathname === '/internal/profile') {
      this.dashboardClass = 'w3-bar-item w3-button';
      this.profileClass = 'w3-bar-item w3-button w3-white';
      this.adminClass = 'w3-bar-item w3-button';
    }
    if (window.location.pathname === '/internal/secure') {
      this.dashboardClass = 'w3-bar-item w3-button';
      this.profileClass = 'w3-bar-item w3-button';
      this.adminClass = 'w3-bar-item w3-button w3-white';
    }
    this.userLogged = JSON.parse(localStorage.getItem('loggedUser')).username.split(" ")[0];
    this.admin = JSON.parse(localStorage.getItem('loggedUser')).email;
    if (JSON.parse(localStorage.getItem('loggedUser')).profilePicture) {
      this.imageUrl = this.url + '/user/get/picture/' + JSON.parse(localStorage.getItem('loggedUser')).profilePicture;
    }
  }

  activeDashboard() {
    this.dashboardClass = 'w3-bar-item w3-button w3-white';
    this.profileClass = 'w3-bar-item w3-button';
    this.adminClass = 'w3-bar-item w3-button';
    this.router.navigateByUrl('/internal/dashboard');
  }

  activeProfile() {
    this.dashboardClass = 'w3-bar-item w3-button';
    this.profileClass = 'w3-bar-item w3-button w3-white';
    this.adminClass = 'w3-bar-item w3-button';
    this.router.navigateByUrl('/internal/profile');
  }

  ngOnDestroy() {
    // this.userOnlineFunction();
  }

  activeAdmin() {
    this.dashboardClass = 'w3-bar-item w3-button';
    this.profileClass = 'w3-bar-item w3-button';
    this.adminClass = 'w3-bar-item w3-button w3-white';
    if (JSON.parse(localStorage.getItem('loggedUser')).email === 'jaskaran@gmail.com') {
      this.router.navigateByUrl('/internal/secure');
    } else {
      this.toastr.error('Unauthorized');
    }
  }

}
