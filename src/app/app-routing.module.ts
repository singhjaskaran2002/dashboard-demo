import { ExternalAuthguardService } from './services/external-authGuard.service';
import { AuthGuardService as AuthGuard } from './services/authGuard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanDeactivate } from '@angular/router';
import { LoginComponent } from './external/login/login.component';
import { RegisterComponent } from './external/register/register.component';
// import { FrontpageComponent } from './external/frontpage/frontpage.component';
import { PageNotFoundComponent } from './external/page-not-found/page-not-found.component';

const parentRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [ExternalAuthguardService] },
  { path: 'register', component: RegisterComponent },
  { path: 'internal', canActivate: [AuthGuard], loadChildren: './internal/internal.module#InternalModule' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(parentRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
