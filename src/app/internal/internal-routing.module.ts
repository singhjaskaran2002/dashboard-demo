import { ContactComponent } from './contact/contact.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SecureComponent } from './secure/secure.component';
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from './profile/profile.component';
import { InternalComponent } from './internal.component';
import { AuthGuardService as AuthGuard } from '../services/authGuard.service';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { ChatComponent } from './chat/chat.component';

const childRoutes: Routes = [
  {
    path: '', component: InternalComponent, canActivate: [AuthGuard], canDeactivate: [AuthGuard], children: [
      { path: '', canActivate: [AuthGuard], canDeactivate: [AuthGuard], redirectTo: 'dashboard' },
      { path: 'dashboard', canActivate: [AuthGuard], canDeactivate: [AuthGuard], component: DashboardComponent },
      { path: 'secure', canActivate: [AuthGuard], canDeactivate: [AuthGuard], component: SecureComponent },
      { path: 'password', canActivate: [AuthGuard], canDeactivate: [AuthGuard], component: PasswordComponent },
      { path: 'profile', canActivate: [AuthGuard], canDeactivate: [AuthGuard], component: ProfileComponent },
      { path: 'profile', canActivate: [AuthGuard], canDeactivate: [AuthGuard], component: ProfileComponent },
      { path: 'profile/update', canActivate: [AuthGuard], canDeactivate: [AuthGuard], component: ProfileUpdateComponent },
      { path: 'chat', canActivate: [AuthGuard], canDeactivate: [AuthGuard], component: ChatComponent },
      { path: 'contact', canActivate: [AuthGuard], canDeactivate: [AuthGuard], component: ContactComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class InternalRoutingModule { }
