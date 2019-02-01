import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TopnavbarService {

  constructor(private router: Router) { }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
