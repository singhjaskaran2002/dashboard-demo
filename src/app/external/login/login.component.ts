import { host } from './../../common/config';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../register/register.service';
// import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  showSpinner = false;
  showSpinner2 = false;
  imageUrl;
  un_matched_pass = false;
  reset_email;
  resend_active = false;

  public form: FormGroup;
  public form1: FormGroup;
  public form2: FormGroup;
  public form3: FormGroup;

  userData: any = {};

  EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService,
    private registerService: RegisterService
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.EMAIL_REGEX)])],
      password: ['', Validators.required]
    });

    this.form1 = this.formBuilder.group({
      contact: ['', Validators.compose([Validators.required, Validators.minLength(10)])]
    });

    this.form2 = this.formBuilder.group({
      otp: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.form3 = this.formBuilder.group({
      newPass: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPass: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  ngOnInit() {
  }

  resendOTP() {
    this.showSpinner2 = true;
    var user = {
      email: this.reset_email,
      contact: '+91' + this.form1.controls['contact'].value
    }

    this.registerService.sendOtp(user).subscribe(res => {
      if (res.status === '200') {
        this.toastr.success('OTP re-sent successfully')
        this.step1 = false;
        this.step2 = false;
        this.step3 = true;
        this.step4 = false;
        this.resend_active = false;
        this.showSpinner2 = false;
      }
    });
    this.form1.controls['otp'].patchValue('');
    document.getElementById('otpBox').focus();
  }

  resetPassword() {
    if (this.form3.valid) {
      var user = {
        confirmPass: this.form3.controls['confirmPass'].value,
        email: this.reset_email
      }
      this.loginService.resetPass(user).subscribe(res => {
        if (res.status === '200') {
          this.toastr.success('reset password succesfully');
          this.step1 = true;
          this.step2 = false;
          this.step3 = false;
          this.step4 = false;
          this.un_matched_pass = false;
        }
      });
    } else {
      Object.keys(this.form3.controls).forEach(key => {
        this.form3.controls[key].markAsTouched({ onlySelf: true });
      });
    }
  }

  comparePass() {
    var newPass = this.form3.controls['newPass'].value;
    var confirmPass = this.form3.controls['confirmPass'].value;

    if (newPass === confirmPass) {
      this.un_matched_pass = false;
    } else {
      this.un_matched_pass = true;
    }
  }

  contactAgain() {
    this.step1 = false;
    this.step2 = true;
    this.step3 = false;
    this.step4 = false;
  }

  confirmOTP() {
    var otpData = {
      email: this.reset_email,
      otp: this.form2.controls['otp'].value
    }

    this.registerService.verifyOtp(otpData).subscribe(res => {
      if (res.status === '200') {
        this.step1 = false;
        this.step2 = false;
        this.step3 = false;
        this.step4 = true;
        this.resend_active = false;
      } else if (res.status === 'WRONG_OTP') {
        this.toastr.warning('OTP not matched, please try again');
        this.step1 = false;
        this.step2 = false;
        this.step3 = true;
        this.step4 = false;
        this.resend_active = false;
      } else if (res.status = 'OTP_EXPIRED') {
        this.toastr.error('OTP Expired, please resend OTP');
        this.step1 = false;
        this.step2 = false;
        this.step3 = true;
        this.step4 = false;
        this.resend_active = true;
      }
    });
    this.form2.controls['otp'].patchValue('');
    document.getElementById('otpBox').focus();
  }

  sendOtp() {
    if (this.form1.valid) {
      this.showSpinner = true;
      var contact = '+91' + this.form1.controls['contact'].value;
      this.loginService.getByContact(contact).subscribe(res => {
        if (res.status === '200') {
          this.imageUrl = host + '/user/get/profilepicture/' + res.data.email;
          this.reset_email = res.data.email;
          var user = {
            email: res.data.email,
            contact: res.data.contact
          }
          this.registerService.sendOtp(user).subscribe(res => {
            if (res.status === '200') {
              this.showSpinner = false;
              this.step3 = true;
              this.step1 = false;
              this.step2 = false;
              this.step4 = false;
            }
          }, err => {
            this.showSpinner = false;
            this.step3 = false;
            this.step1 = false;
            this.step2 = true;
            this.step4 = false;
          });
        }
      });
    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].markAsTouched({ onlySelf: true });
      });
    }
  }

  forgotPassword() {
    this.step1 = false;
    this.step2 = true;
    this.step3 = false;
    this.step4 = false;
  }

  login() {
    if (this.form.valid) {
      this.loginService.login(this.form.value).subscribe(res => {
        if (res.status === '200') {
          localStorage.setItem('loggedUser', JSON.stringify(res.user));
          localStorage.setItem('accessToken', res.accessToken);
          this.router.navigateByUrl('/internal');
          this.toastr.success('Welcome');
        }
      });
    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].markAsTouched({ onlySelf: true });
      });
    }
  }

}
