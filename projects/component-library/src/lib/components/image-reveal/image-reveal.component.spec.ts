import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageRevealComponent } from './image-reveal.component';
import { IImageRevealInput } from './interfaces/image-reveal-input.interface';

describe('ImageRevealComponent', () => {
  let component: ImageRevealComponent;
  let fixture: ComponentFixture<ImageRevealComponent>;

  const input: IImageRevealInput = {
    viewports: [
      {
        imagePath: 'assets/img/image-reveal/auto-3368094.jpg',
        width: 300,
      },
      {
        imagePath: 'assets/img/image-reveal/auto-3370706.jpg',
        width: 300,
      }
    ],
    height: 500,
    handle: { width: 3 },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageRevealComponent ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageRevealComponent);
    component = fixture.componentInstance;
    component.input = input;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {

    it('should set height correctly', () => {
      expect(component.ir.height).toBe(500);
    });

    it('should set left viewport image path correctly', () => {
      expect(component.ir.viewports[0].imagePath).toBe('assets/img/image-reveal/auto-3368094.jpg');
    });

    it('should set right viewport image path correctly', () => {
      expect(component.ir.viewports[1].imagePath).toBe('assets/img/image-reveal/auto-3370706.jpg');
    });

    it('should set left viewport width correctly', () => {
      expect(component.ir.viewports[0].width).toBe(298.5);
    });

    it('should set right viewport width correctly', () => {
      expect(component.ir.viewports[1].width).toBe(298.5);
    });

    it('should set handle width correctly', () => {
      expect(component.ir.handle.width).toBe(3);
    });

    it('should set overall width correctly', () => {
      expect(component.irWidth).toBe(600); // 298.5, 3, 298.5 = 600
    });

  });

});
