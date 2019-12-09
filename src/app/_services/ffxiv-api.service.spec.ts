import { TestBed } from '@angular/core/testing';

import { FfxivApiService } from './ffxiv-api.service';

describe('FfxivApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FfxivApiService = TestBed.get(FfxivApiService);
    expect(service).toBeTruthy();
  });
});
