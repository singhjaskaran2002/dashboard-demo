import { ToastrService } from 'ngx-toastr';
import { ProfileService } from './profile.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Lightbox } from 'ngx-lightbox';
import { host } from 'src/app/common/config';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  imageUrl;
  image: File;
  profile: any = {};
  userData: any = {};
  isEdit = false;
  profileImage: File;
  imageFile;
  album: Array<any> = [];

  imageLoad = false;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    private profileService: ProfileService,
    private toastr: ToastrService,
    private router: Router,
    private lightbox: Lightbox
  ) { }

  ngOnInit() {
  }

  ngDoCheck(): void {
    const url = JSON.parse(localStorage.getItem('loggedUser')).profilePicture;
    if (url) {
      this.imageUrl = host + '/user/get/picture/' + url;
    }
    this.userData = JSON.parse(localStorage.getItem('loggedUser'));
  }

  // fileChangeEvent(event: any): void {
  //   this.isEdit = true;
  //   this.imageChangedEvent = event;
  // }

  // imageCropped(event: ImageCroppedEvent) {
  //   this.croppedImage = event.base64;
  //   this.imageFile = this.base64toImageFile(this.croppedImage.split('base64,')[1]);
  // }

  // imageLoaded() {
  //   console.log('image loaded');
  // }

  // base64toImageFile(base64): any {
  //   const loggedEmail = JSON.parse(localStorage.getItem('loggedUser')).email;
  //   const now = new Date().getMilliseconds();
  //   const imageName = loggedEmail + now + '.jpeg';
  //   const imageBlob = this.dataURItoBlob(base64);
  //   const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
  //   return imageFile;
  // }

  // dataURItoBlob(dataURI) {
  //   const byteString = atob(dataURI);
  //   const arrayBuffer = new ArrayBuffer(byteString.length);
  //   const int8Array = new Uint8Array(arrayBuffer);
  //   for (let i = 0; i < byteString.length; i++) {
  //     int8Array[i] = byteString.charCodeAt(i);
  //   }
  //   const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
  //   return blob;
  // }

  // uploadFile() {
  //   this.profile.email = JSON.parse(localStorage.getItem('loggedUser')).email;
  //   this.profile.profilePicture = this.imageFile;
  //   this.profileService.updateProfilePicture(this.profile).subscribe(res => {
  //     this.profileService.get(JSON.parse(localStorage.getItem('loggedUser')).email).subscribe(data => {
  //       localStorage.setItem('loggedUser', JSON.stringify(data.user));
  //     });
  //     this.imageUrl = 'http://localhost:8083/user/get/picture/' + res.profilePicture;
  //     this.toastr.success('Profile picture updated successfully');
  //   });
  //   this.isEdit = false;
  // }

  // loadImageFailed() {
  //   console.log('load image failed');
  // }

  cancelUpload() {
    this.isEdit = false;
  }

  onChangePicture(event) {
    this.profile.email = JSON.parse(localStorage.getItem('loggedUser')).email;
    this.profile.profilePicture = event.target.files[0];
    this.profileService.updateProfilePicture(this.profile).subscribe(res => {
      this.profileService.get(JSON.parse(localStorage.getItem('loggedUser')).email).subscribe(data => {
        localStorage.setItem('loggedUser', JSON.stringify(data.user));
      });
      this.imageUrl = 'http://localhost:8083/user/get/picture/' + res.profilePicture;
      this.toastr.success('Profile picture updated successfully');
    });
  }

  openImage() {
    this.album = [];
    const album = {
      src: this.imageUrl,
      caption: JSON.parse(localStorage.getItem('loggedUser')).username
    }

    // 'https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg'

    this.album.push(album);
    this.lightbox.open(this.album);
  }
}

// profileImageChange(event) {
  //   this.profile.email = JSON.parse(localStorage.getItem('loggedUser')).email;
  //   this.image = event.target.files[0];
  //   console.log('image: ', this.image);
  //   this.profile.profilePicture = this.image;
  //   this.profileService.updateProfilePicture(this.profile).subscribe(res => {
  //     this.toast r.success('Profile picture updated successfully');
  //   });
  // }


// var src = event.base64;
  // var newImage = document.createElement('img');
  // newImage.src = src;
  // newImage.width = newImage.height = "80";
  // document.querySelector('#imageContainer').innerHTML = newImage.outerHTML;
  // document.getElementById('imageSrc').innerHTML = newImage.outerHTML;
  // this.profileImage = this.base64ToArrayBuffer(this.loggedUserImageUrl);
  // console.log('====>', this.profileImage);