import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import NotFoundComponent from './not-found/not-found.component';
import ForbiddenComponent from './forbidden/forbidden.component';
import WarningComponent from './warning/warning.component';
import InfoComponent from './info/info.component';
import GarlandComponent from './garland/garland.component';

@NgModule({
  imports: [RouterModule, FormsModule, CommonModule],
  exports: [
    NotFoundComponent,
    ForbiddenComponent,
    WarningComponent,
    InfoComponent,
    GarlandComponent,
  ],
  declarations: [
    NotFoundComponent,
    ForbiddenComponent,
    WarningComponent,
    InfoComponent,
    GarlandComponent,
  ],
})
export default class SharedModule {}
