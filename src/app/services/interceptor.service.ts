import { Injectable } from '@angular/core';
import { HttpRequest, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header.
    const token = localStorage.getItem('accessToken');
    if (token) {
      req = req.clone({ headers: req.headers.set('authorization', 'Bearer ' + token) });
    }

    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const status = event.body.status;
        if (status === '506') {
          this.toastr.error('Current password not matched');
        } else if (status === '401') {
          this.toastr.error('Not authorized', 'OOPS !!!');
        } else if (status === '403') {
          this.toastr.error('Current password and new password matched');
        } else if (status === '500') {
          this.toastr.error('Internal server error');
        } else if (status === '404') {
          this.toastr.error('Record not found');
        }
      }
    },
      (err: any) => {
        this.toastr.error('Server Down', 'OOPS !!!');
      }));
  }
}