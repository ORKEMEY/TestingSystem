import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import NotFoundComponent from './not-found.component';
import ForbiddenComponent from './forbidden.component';

@NgModule({
  imports: [RouterModule, FormsModule, CommonModule],
  exports: [NotFoundComponent, ForbiddenComponent],
  declarations: [NotFoundComponent, ForbiddenComponent],
})
export default class SharedModule {}
