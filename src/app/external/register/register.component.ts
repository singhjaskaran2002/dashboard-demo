import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  showSpinner = false;
  showSpinner2 = false;
  step2 = false;
  otpVerified = false;
  resend_otp = false;
  step1 = true;
  type = 'password';
  showPass = false;
  public form: FormGroup;
  public form1: FormGroup;

  EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private registerService: RegisterService
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.EMAIL_REGEX)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      username: ['', Validators.required],
      contact: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      city: ['', Validators.required],
      job: ['', Validators.required],
      company: ['']
    });

    this.form1 = this.formBuilder.group({
      otp: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() {
  }

  resend_Otp() {
    this.showSpinner2 = true;
    var user = {
      email: this.form.controls['email'].value,
      contact: '+91' + this.form.controls['contact'].value
    }

    this.registerService.sendOtp(user).subscribe(res => {

      if (res.status === '200') {
        this.toastr.success('OTP send on your contact')
        this.step2 = true;
        this.step1 = false;
        this.resend_otp = false;
        this.showSpinner2 = false;
      }
    });
    this.form1.controls['otp'].patchValue('');
    document.getElementById('otpBox').focus();
  }

  togglePassword() {
    if (this.showPass) {
      this.showPass = false;
      this.type = "password";
    } else {
      this.showPass = true;
      this.type = "text";
    }
  }

  registration() {
    this.registerService.register(this.form.value).subscribe(res => {
      if (res.status === 'duplicate_entry') {
        this.toastr.warning('Record already exist with this email');
      } else if (res.status === '200') {
        this.toastr.success('Registered successfully');
        this.router.navigateByUrl('/login');
        this.step2 = false;
        this.step1 = true;
      }
    });
  }

  confirmOTP() {
    if (this.form1.valid) {
      var otpData = {
        otp: this.form1.controls['otp'].value,
        email: this.form.controls['email'].value
      }
      this.registerService.verifyOtp(otpData).subscribe(res => {
        if (res.status === 'OTP_EXPIRED') {
          this.toastr.error('Attempts Exceeded, please send OTP again');
          this.resend_otp = true;
          // this.step2 = false;
        } else if (res.status === 'WRONG_OTP') {
          this.toastr.warning('OTP not matched, please try again');
          // this.resend_otp = true;
        } else if (res.status === '200') {
          this.registration();
          this.resend_otp = false;
        }
      });
      this.form1.controls['otp'].patchValue('');
      document.getElementById('otpBox').focus();
    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].markAsTouched({ onlySelf: true });
      });
    }
  }

  register() {
    if (this.form.valid) {
      this.showSpinner = true;
      var user = {
        email: this.form.controls['email'].value,
        contact: '+91' + this.form.controls['contact'].value
      }

      this.registerService.sendOtp(user).subscribe(res => {
        if (res.status === '200') {
          this.showSpinner = false;
          this.step2 = true;
          this.step1 = false;
        }
      }, err => {
        this.showSpinner = false;
      });
    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].markAsTouched({ onlySelf: true });
      });
    }
  }

}
