import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageRevealComponent } from './image-reveal.component';

@NgModule({
  declarations: [ImageRevealComponent],
  imports: [
    CommonModule
  ],
  exports: [ImageRevealComponent]
})
export class ImageRevealModule { }
