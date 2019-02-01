import { host } from './../../common/config';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StripeCardComponent, ElementOptions, ElementsOptions, StripeService } from 'ngx-stripe';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import swal from "sweetalert";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  receipt_url;
  spinner = false;
  public paymentForm: FormGroup;

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#111',
        color: '#111',
        fontSize: "16px",
        '::placeholder': {
          color: '#00b3b3'
        }
      }
    }
  }

  //other optional options
  elementsOptions: ElementsOptions = {
    // locale: 'es'
  };

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private stripeService: StripeService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.paymentForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      amount: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.paymentForm.controls['email'].patchValue(JSON.parse(localStorage.getItem('loggedUser')).email);
    this.paymentForm.controls['name'].patchValue(JSON.parse(localStorage.getItem('loggedUser')).username);
  }

  buy() {
    if (this.paymentForm.valid) {
      this.spinner = true;
      this.stripeService.createToken(this.card.getCard(), { name })
        .subscribe(result => {

          if (result.token) {
            // const headers = new HttpHeaders()
            //   .set('Content-Type', 'application/json');

            // token id to be sent to the backend to process the payment
            let obj = {
              token: result.token.id,
              email: this.paymentForm.controls['email'].value,
              user: this.paymentForm.controls['name'].value,
              amount: +this.paymentForm.controls['amount'].value * 100,
              description: this.paymentForm.controls['description'].value
            }

            // make a call to the server
            this.http.post<any>(host + '/stripe/charge', obj).subscribe(data => {
              if (data.error) {
                this.spinner = false;
                this.toastr.error(data.error.message)
              } else if (data.details) {
                swal({
                  title: "Thankyou !!!",
                  text: "Donated ₹" + (data.details.amount / 100),
                  icon: "success"
                });
                this.receipt_url = data.details.receipt_url;
                this.card.getCard().clear();
                this.spinner = false;
                this.paymentForm.reset();
              }
            });
          } else if (result.error) {
            this.spinner = false;
            this.toastr.warning(result.error.message, result.error.type)
          }
        });
    } else {
      Object.keys(this.paymentForm.controls).forEach(key => {
        this.paymentForm.controls[key].markAsTouched({ onlySelf: true });
      });
    }
  }

}
