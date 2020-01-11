import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ImageParallaxDirective } from './image-parallax.directive';

@Component({
  template: `<div compParallaxLayer [ngStyle]="input"></div>`
})
class TestImageParallaxComponent {
  input = {};
}

describe('ImageParallaxDirective', () => {

  let component: TestImageParallaxComponent;
  let fixture: ComponentFixture<TestImageParallaxComponent>;
  let element: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestImageParallaxComponent,
        ImageParallaxDirective
      ]
    });
    fixture = TestBed.createComponent(TestImageParallaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create successfully', () => {
    expect(component).toBeTruthy();
  });

  // having great trouble getting access to images during test
  xdescribe('#onTouchMove', () => {

    beforeEach(() => {
      component.input = {
        height: '400px',
        backgroundImage: 'url(assets/img/auto-3368094.jpg)',
        //backgroundSize: 'cover',
        //backgroundPosition: 'center',
        //backgroundRepeat: 'no-repeat',
      };
      //http://localhost:9876/assets/img/auto-3368094.jpg
      fixture.detectChanges();
    });

    it('should', () => {
      const touchList: any = {
        changedTouches: [
          {
            clientX: 10,
            clientY: 10,
          },
        ]
      };

      element = fixture.debugElement.query(By.directive(ImageParallaxDirective));
      element.triggerEventHandler('touchmove', touchList);
      fixture.detectChanges();

      console.log(element.nativeElement.backgroundPosition);
    });

  });

});
