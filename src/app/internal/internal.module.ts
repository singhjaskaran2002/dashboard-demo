import { ChatService } from './chat/chat.service';
import { SidenavbarComponent } from './../common/sidenavbar/sidenavbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './dashboard/dashboard.service';
import { SecureComponent } from './secure/secure.component';
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from './profile/profile.component';
import { SecureService } from './secure/secure.service';
import { ProfileService } from './profile/profile.service';
import { PasswordService } from './password/password.service';
import { InternalRoutingModule } from './internal-routing.module';
import { InternalComponent } from './internal.component';
import { TopnavbarComponent } from '../common/topnavbar/topnavbar.component';
import { TopnavbarService } from '../common/topnavbar/topnavbar.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { ProfileUpdateService } from './profile-update/profile-update.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FooterComponent } from '../common/footer/footer.component';
import { LightboxModule } from "ngx-lightbox";
import { ChatComponent } from './chat/chat.component';
import { SearchPipe } from '../common/searchPipe';
import { PaymentComponent } from './payment/payment.component';
import { NgxPaginationModule } from "ngx-pagination";
import { ContactComponent } from './contact/contact.component';
import { NgxStripeModule } from "ngx-stripe";

@NgModule({
  declarations: [
    SearchPipe,
    DashboardComponent,
    SecureComponent,
    PasswordComponent,
    ProfileComponent,
    SidenavbarComponent,
    InternalComponent,
    TopnavbarComponent,
    ProfileUpdateComponent,
    FooterComponent,
    ChatComponent,
    PaymentComponent,
    ContactComponent
  ],
  imports: [
    NgxStripeModule.forRoot('pk_test_uZvgefFExNvv3rlvucHjSyPH'),
    NgxPaginationModule,
    LightboxModule,
    ImageCropperModule,
    CommonModule,
    InternalRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    DashboardService,
    SecureService,
    ProfileService,
    PasswordService,
    TopnavbarService,
    ProfileUpdateService,
    ChatService
  ]
})
export class InternalModule { }
