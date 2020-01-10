import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.scss']
})
export class ParallaxComponent implements OnInit {
  height: number;
  styleProps = {
    height: '100%',
    backgroundImage: 'url(assets/img/auto-3368094.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  constructor() { }

  ngOnInit() {
    this.height = window.innerHeight;
  }

  @HostListener('window:resize')
  onResize() {
    this.height = window.innerHeight;
  }

}
