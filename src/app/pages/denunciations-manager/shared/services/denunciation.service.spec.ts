import { TestBed } from '@angular/core/testing';

import { DenunciationService } from './denunciation.service';

describe('DenunciationService', () => {
  let service: DenunciationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DenunciationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
