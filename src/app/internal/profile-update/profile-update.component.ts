import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from './../profile/profile.service';
import { ProfileUpdateService } from './profile-update.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  userData: any = {};
  public form: FormGroup;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private profileUpdateService: ProfileUpdateService,
    private profileService: ProfileService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      city: ['', Validators.required],
      company: [''],
      job: ['', Validators.required],
      profilePicture: ['']
    })
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('loggedUser'));
    this.form.controls.email.patchValue(this.userData.email);
    this.form.controls.username.patchValue(this.userData.username);
    this.form.controls.job.patchValue(this.userData.job);
    this.form.controls.company.patchValue(this.userData.company);
    this.form.controls.city.patchValue(this.userData.city);
  }

  updateData() {
    if (this.form.valid) {
      this.form.controls.profilePicture.patchValue(this.userData.profilePicture);
      this.profileUpdateService.updateProfile(this.form.value).subscribe(res => {
        if (res.status === '200') {
          localStorage.setItem('loggedUser', JSON.stringify(this.form.value));
          this.toastr.success('Record updated successfully');
          this.router.navigateByUrl('/internal/profile');
          this.userData = {};
        } else if (res.status === '404') {
          this.toastr.error('Enter valid email')
        } else {
          this.toastr.error('Internal server error');
        }
      });
    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].markAsTouched({ onlySelf: true });
      });
    }
  }

}
