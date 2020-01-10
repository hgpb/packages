import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageRevealComponent } from './image-reveal.component';
import { ImageParallaxModule } from '../image-parallax/image-parallax.module';

@NgModule({
  declarations: [
    ImageRevealComponent,
  ],
  imports: [
    CommonModule,
    ImageParallaxModule,
  ],
  exports: [ImageRevealComponent]
})
export class ImageRevealModule { }
