import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderLayoutComponent } from './layout/header.component';
import { FooterLayoutComponent } from './layout/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderLayoutComponent,
    FooterLayoutComponent
  ]
})
export class SharedModule { }
