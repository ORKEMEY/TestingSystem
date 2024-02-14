import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import NotFoundComponent from './not-found/not-found.component';
import ForbiddenComponent from './forbidden/forbidden.component';
import WarningComponent from './warning/warning.component';
import InfoComponent from './info/info.component';
import AlertComponent from './alert/alert.component';
import GarlandComponent from './garland/garland.component';
import ThemeSwitchComponent from './theme-switch/theme-switch.component';

import TimeSpanPipe from './pipes/time-span.pipe';

@NgModule({
  imports: [RouterModule, FormsModule, CommonModule],
  exports: [
    NotFoundComponent,
    ForbiddenComponent,
    WarningComponent,
    InfoComponent,
    AlertComponent,
    GarlandComponent,
    ThemeSwitchComponent,
    TimeSpanPipe,
  ],
  declarations: [
    NotFoundComponent,
    ForbiddenComponent,
    WarningComponent,
    InfoComponent,
    AlertComponent,
    GarlandComponent,
    ThemeSwitchComponent,
    TimeSpanPipe,
  ],
})
export default class SharedModule {}
