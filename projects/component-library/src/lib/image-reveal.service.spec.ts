import { TestBed } from '@angular/core/testing';

import { ImageRevealService } from './image-reveal.service';

describe('ImageRevealService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageRevealService = TestBed.get(ImageRevealService);
    expect(service).toBeTruthy();
  });
});
