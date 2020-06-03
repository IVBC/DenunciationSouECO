import { TestBed } from '@angular/core/testing';

import { RedirectDenunciationService } from './redirect-denunciation.service';

describe('RedirectDenunciationService', () => {
  let service: RedirectDenunciationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedirectDenunciationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
