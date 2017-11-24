import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderLayoutComponent } from './layout/header.component';
import { FooterLayoutComponent } from './layout/footer.component';
import { FilterFormComponent } from './forms/filter-form/filter-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderLayoutComponent,
    FooterLayoutComponent,
    FilterFormComponent
  ]
})
export class SharedModule { }
