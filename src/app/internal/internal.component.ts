import { ChatService } from './chat/chat.service';
// import { MessagingService } from './../common/messaging.service';
import { ProfileService } from './profile/profile.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MessagingService } from '../common/messaging.service';

@Component({
  selector: 'app-internal',
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.css']
})
export class InternalComponent implements OnInit {

  message;

  constructor(
    private toastr: ToastrService,
    private messagingService: MessagingService,
    private chatService: ChatService,
    private loaderService: NgxSpinnerService,
    private profileService: ProfileService
  ) {
  }

  ngOnInit() {
    let email = JSON.parse(localStorage.getItem('loggedUser')).email;
    this.profileService.get(email).subscribe(res => {
      localStorage.setItem('loggedUser', JSON.stringify(res.user));
    });

    this.loaderService.show();

    setTimeout(() => {
      this.loaderService.hide();
    }, 1000);
  }

}
