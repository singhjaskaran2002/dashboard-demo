import swal from 'sweetalert';
import { ToastrService } from 'ngx-toastr';
import { SecureService } from './secure.service';
import { host } from './../../common/config';
import { DashboardService } from './../dashboard/dashboard.service';
import { Component, OnInit } from '@angular/core';
// import swal

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

  p = 1;
  searchText: string;
  imageUrl;
  users: Array<any> = [];
  loggedEmail;

  constructor(
    private dashboardService: DashboardService,
    private secureService: SecureService,
    private toastr: ToastrService
  ) {
    this.userList();
    this.loggedEmail = JSON.parse(localStorage.getItem('loggedUser')).email;
    this.imageUrl = host + '/user/get/picture';
  }

  userList() {
    this.dashboardService.getUsers().subscribe(data => {
      for (let i = 0; i < data.userlist.length; i++) {
        if (data.userlist[i].email !== this.loggedEmail) {
          this.users.push(data.userlist[i]);
        }
      }
    });
  }

  ngOnInit() {
  }

  ngDoCheck() {
  }

  deleteUser(email) {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this record!",
      icon: "warning",
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true
    }).then((isConfirm) => {
      if (isConfirm) {
        this.secureService.deleteUser(email).subscribe(res => {
          if (res.status === '200') {
            swal('', 'Deleted Successfully', 'success');
            this.userList();
            // this.toastr.success('Record deleted successfully');
          }
        });
      } else {
        return true;
      }
    })
  }

  // deleteUser(email) {
  //   this.secureService.deleteUser(email).subscribe(res => {
  //     if (res.status === '200') {
  //       this.userList();
  //       this.toastr.success('Record deleted successfully');
  //     }
  //   });
  // }

}
