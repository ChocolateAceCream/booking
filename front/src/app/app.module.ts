import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MaterialModule} from './material.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UIService } from './shared/ui.service';
import { ReservationComponent } from './reservation/reservation.component';
import { NewReservationComponent } from './reservation/new-reservation/new-reservation.component';
import { ReservationService } from './reservation/reservation.service';
import { AllReservationComponent } from './reservation/all-reservation/all-reservation.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        WelcomeComponent,
        HeaderComponent,
        ReservationComponent,
        NewReservationComponent,
        AllReservationComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule

    ],
    providers: [AuthService, UIService, ReservationService],
    bootstrap: [AppComponent]

})
export class AppModule { }
