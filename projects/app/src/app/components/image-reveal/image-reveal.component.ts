import { Component, OnInit } from '@angular/core';
import {IImageReveal, IImageRevealInput} from '../../../../../component-library/src/lib/image-reveal.component';

@Component({
  selector: 'app-image-reveal',
  templateUrl: './image-reveal.component.html',
  styleUrls: ['./image-reveal.component.css']
})
export class ImageRevealComponent implements OnInit {

  imageContainer: IImageRevealInput;

  constructor() { }

  ngOnInit() {
    const image1: IImageReveal = {
      path: 'assets/img/image-reveal/auto-3368094.jpg',
      width: 200,
    };
    const image2: IImageReveal = {
      path: 'assets/img/image-reveal/auto-3370706.jpg',
    };
    this.imageContainer = {
      images: [ image1, image2 ],
      height: 700,
    };
  }

}
