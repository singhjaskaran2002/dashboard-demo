import { ProfileService } from './../profile/profile.service';
import { PasswordService } from './password.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  password;

  public form: FormGroup;

  constructor(
    private passwordService: PasswordService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private profileService: ProfileService
  ) {
    this.form = this.formBuilder.group({
      current: ['', Validators.required],
      new: ['', Validators.required]
    })

    this.password = { email: '', current: '', new: '' }
  }

  ngOnInit() {
    this.password.email = JSON.parse(localStorage.getItem('loggedUser')).email;
  }

  updataPassword() {
    if (this.form.valid) {
      this.passwordService.updatePassword(this.password).subscribe(res => {
        if (res.status === '200') {
          this.profileService.get(JSON.parse(localStorage.getItem('loggedUser')).email).subscribe(data => {
            localStorage.setItem('loggedUser', JSON.stringify(data.user));
          });
          this.router.navigateByUrl('/internal');
          this.toastr.success('Password updated successfully');
        }
      });
    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].markAsTouched({ onlySelf: true });
      });
    }
  }

}