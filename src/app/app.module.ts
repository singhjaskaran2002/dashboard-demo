import { MessagingService } from './common/messaging.service';
import { InterceptorService } from './services/interceptor.service';
import { ExternalAuthguardService } from './services/external-authGuard.service';
import { AuthGuardService } from './services/authGuard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './external/login/login.component';
import { RegisterComponent } from './external/register/register.component';
import { LoginService } from './external/login/login.service';
import { RegisterService } from './external/register/register.service';
import { FrontpageComponent } from './external/frontpage/frontpage.component';
import { PageNotFoundComponent } from './external/page-not-found/page-not-found.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgxSpinnerModule } from 'ngx-spinner';

import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AsyncPipe } from '@angular/common';

@NgModule({
  declarations: [
    // SearchPipe,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FrontpageComponent,
    PageNotFoundComponent,
  ],
  imports: [
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      preventDuplicates: true
    })
  ],
  providers: [
    AsyncPipe,
    MessagingService,
    LoginService,
    RegisterService,
    AuthGuardService,
    ExternalAuthguardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
