import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import AppRoutingModule from './app-routing.module';

import SharedModule from './shared/shared.module';
import UserModule from './user/user.module';
import AdminPanelModule from './admin-panel/admin-panel.module';
import MenuModule from './menu/menu.module';

import AppComponent from './app.component';

import AuthInterceptor from './core/interceptors/authentification.interceptor';
import RetryInterceptor from './core/interceptors/retry.interceptor';

import AuthGuard from './core/guards/auth.guard';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    SharedModule,
    UserModule,
    AdminPanelModule,
    MenuModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RetryInterceptor,
      multi: true,
    },
    { provide: 'attemptNum', useValue: 3 },
  ], // service registration
})
export default class AppModule {}
