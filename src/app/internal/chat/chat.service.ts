// import { MessagingService } from './../../common/messaging.service';
import { chatHost, host } from './../../common/config';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  url = chatHost;
  url1 = host;
  chatSender;
  loggedEmail = JSON.parse(localStorage.getItem('loggedUser')).email;
  chatReceiver;
  private socket = io.connect(this.url, { query: { loggedEmail: this.loggedEmail } });

  constructor(
    private http: HttpClient
  ) {
  }

  firebaseMessage(obj) {
    return this.http.post<any>(this.url1 + '/firebase/push', obj);
  }

  getMessages(data) {
    return this.http.post<any>(this.url1 + '/chat/get/messages', data);
  }

  assignNames() {
    this.chatSender = JSON.parse(localStorage.getItem('loggedUser')).email;
    this.chatReceiver = localStorage.getItem('recepientEmail');
  }

  usersOnline() {
    let observable = new Observable<any>(observer => {
      this.socket.on('users_online', (data) => {
        observer.next(data.users);
      });
    });
    return observable;
  }

  send(data) {
    this.socket.emit('message_sent', data);
    data = {};
    this.assignNames();
  }

  user_typing_received() {
    this.assignNames();
    let observable = new Observable<any>(observer => {
      this.socket.on('user_typing' + this.chatSender + this.chatReceiver, (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  user_typing(data) {
    this.socket.emit('user_typing', data);
  }

  newMessage() {
    this.assignNames();
    let observable = new Observable<{ id: number, sender: string, receiver: string, message: string, time: string, createdAt: string }>(observer => {
      this.socket.on('message_received' + this.chatSender + this.chatReceiver, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
    return observable;
  }

}
