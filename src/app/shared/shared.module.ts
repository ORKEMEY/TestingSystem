import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import NotFoundComponent from './not-found/not-found.component';
import ForbiddenComponent from './forbidden/forbidden.component';
import WarningComponent from './warning/warning.component';

@NgModule({
  imports: [RouterModule, FormsModule, CommonModule],
  exports: [NotFoundComponent, ForbiddenComponent, WarningComponent],
  declarations: [NotFoundComponent, ForbiddenComponent, WarningComponent],
})
export default class SharedModule {}
