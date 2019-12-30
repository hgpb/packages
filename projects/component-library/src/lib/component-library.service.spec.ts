import { TestBed } from '@angular/core/testing';

import { ComponentLibraryService } from './component-library.service';

describe('ComponentLibraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComponentLibraryService = TestBed.get(ComponentLibraryService);
    expect(service).toBeTruthy();
  });
});
