import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate } from '@angular/router';

import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { routerNgProbeToken } from '@angular/router/src/router_module';

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class AuthGuardService implements CanActivate, CanDeactivate<CanComponentDeactivate> {
    constructor(
        public router: Router,
        private toastr: ToastrService
    ) {
    }

    canActivate(): boolean {
        if (!this.isAuthenticated()) {
            this.router.navigateByUrl('/login');
            return false;
        } else {
            return true;
        }
    }

    canDeactivate(component: CanComponentDeactivate) {
        return component.canDeactivate ? component.canDeactivate() : true;
    }

    loginBeforeProceed() {
        this.toastr.warning('Please login to redirect to this page');
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('accessToken');
        if (token) {
            return true;
        } else {
            this.loginBeforeProceed();
            return false;
        }
    }
}
