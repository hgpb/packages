import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageParallaxDirective } from './image-parallax.directive';

@NgModule({
  declarations: [
    ImageParallaxDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ImageParallaxDirective,
  ]
})
export class ImageParallaxModule { }
