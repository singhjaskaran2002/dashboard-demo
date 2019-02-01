import { host } from './../../common/config';
import { ChatService } from './chat.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessagingService } from 'src/app/common/messaging.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message1;
  // online_user = false;
  // userOnline: Array<any> = [];
  typing = false;
  imageUrl;
  chatRecepient;
  recepientName;
  chatSender;
  messageArray: Array<{ id: number, sender: string, receiver: string, message: string, createdAt: string }> = [];
  message: string;
  loggedEmail = JSON.parse(localStorage.getItem('loggedUser')).email;

  // @ViewChild('chatDiv') private myScrollContainer: ElementRef<any>

  constructor(
    private toastr: ToastrService,
    private chatService: ChatService,
    private messagingService: MessagingService
  ) {
    this.imageUrl = host + '/user/get/profilepicture';
    this.chatRecepient = localStorage.getItem('recepientEmail');
    this.chatSender = JSON.parse(localStorage.getItem('loggedUser')).email;
    this.recepientName = localStorage.getItem('recepientName');

    this.chatService.newMessage().subscribe(data => {
      // console.log(data);

      var obj = {
        firbaseToken: localStorage.getItem('firebaseToken'),
        message: data.message,
        sender: data.sender
      }

      console.log(obj);

      // this.chatService.firebaseMessage(obj).subscribe(res => {
      //   console.log('hello');
      // });

      this.messageArray.push(data);
      this.message = '';
    });

    // this.chatService.usersOnline().subscribe(res => {
    //   for (let i = 0; i < res.length; i++) {
    //     this.userOnline.push(res[0]);
    //   }
    //   this.check_Online_User();
    // })

    this.chatService.user_typing_received().subscribe(res => {
      if (res.event_receiver === this.loggedEmail) {
        this.typing = true;

        setTimeout(() => {
          this.typing = false;
        }, 4000);
      }
    });

    this.chatService.getMessages({ sender: this.chatSender, receiver: this.chatRecepient }).subscribe(res => {
      this.messageArray = res.data;
    })
  }

  ngOnInit() {
  }

  // check_Online_User() {
  //   console.log('online =====>', this.userOnline, this.chatRecepient);
  //   if (this.userOnline.indexOf(this.chatRecepient) > 0) {
  //     this.online_user = true;
  //   } else {
  //     this.online_user = true;
  //   }
  // }

  user_typing() {
    var data = {
      chatSender: this.chatSender,
      chatRecepient: this.chatRecepient
    }
    this.chatService.user_typing(data);
  }

  // scrollToBottom(): void {
  //   try {
  //     this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  //   } catch (err) { }
  // }

  sendMessage() {
    const now = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    var data = { sender: this.chatSender, receiver: this.chatRecepient, message: this.message, time: now };
    this.chatService.send(data);
    document.getElementById("messageBox").focus();
  }

}
