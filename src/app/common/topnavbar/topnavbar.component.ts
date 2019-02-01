import { ToastrService } from 'ngx-toastr';
import { ProfileService } from './../../internal/profile/profile.service';
import { Component, OnInit } from '@angular/core';
import { TopnavbarService } from './topnavbar.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.css']
})
export class TopnavbarComponent implements OnInit {

  loggedUsername;

  constructor(
    private topnavbarService: TopnavbarService,
    private profileService: ProfileService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getLoggedUserName();
  }

  logout() {
    swal({
      title: "Are you sure?",
      // text: "You will be logged Out !",
      icon: "warning",
      buttons: [
        'Cancel',
        'Logout'
      ],
      dangerMode: true
    }).then((isConfirm) => {
      if (isConfirm) {
        this.topnavbarService.logout();
        this.toastr.success('Logged out successfully');
      } else {
        return true;
      }
    })
  }

  getLoggedUserName() {
    var email = JSON.parse(localStorage.getItem('loggedUser')).email;
    this.profileService.get(email).subscribe(res => {
      this.loggedUsername = res.user.username;
    });
  }

}
