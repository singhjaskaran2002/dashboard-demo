import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs'

// curl -X POST -H "Authorization: key=AAAAjo5zyrw:APA91bGp7SwcEBwGbym4THmrmaZgphEp8IR0tUujiv8Tn0PiOJuUx6rnsvQlEkIFM7hkF3OVJBHVxRFDFCgOvv6LQCiejmzf28NN5KpcCDKDKVpZNm7_xO20OHt959mXpBjoxmf24ix8" -H "Content-Type: application/json" -d '{
//   "notification": {
//       "title": "",
//           "body": "5 to 1",
//           "icon": "firebase-logo.png",
//           "click_action": "http://localhost:8081"
//   },
//   "to": "ecncn15zKYc:APA91bHjsedJULx4JUx0Qn19C0VDmONApDHeobIVZo8Z-PKZQfPDGav2EGAepg_Wifh1NGWL_G4RNwnzWI9V5hUTP-XFqFCKts3dAkLSDkaKVwz_kIlhB2cXruF6UT96eXU1JNLtvxPG"
//   }' "https://fcm.googleapis.com/fcm/send"
//   {"multicast_id":4861561718762063326,"success":1,"failure":0,"canonical_ids":0,"results":[{"message_id":"0:1548912981508773%2fd9afcdf9fd7ecd"}]}

@Injectable()
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }

  /**
   * update token in firebase database
   * 
   * @param userId userId as a key 
   * @param token token as a value
   */
  updateToken(userId, token) {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
      () => {
        const data = {};
        data[userId] = token
        this.angularFireDB.object('fcmTokens/').update(data)
      })
  }

  /**
   * request permission for notification from firebase cloud messaging
   * 
   * @param userId userId
   */
  requestPermission(userId) {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        localStorage.setItem('firebaseToken', token);
        this.updateToken(userId, token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
      })
  }
}