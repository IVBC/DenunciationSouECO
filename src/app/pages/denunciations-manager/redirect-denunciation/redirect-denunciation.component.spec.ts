import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectDenunciationComponent } from './redirect-denunciation.component';

describe('RedirectDenunciationComponent', () => {
  let component: RedirectDenunciationComponent;
  let fixture: ComponentFixture<RedirectDenunciationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectDenunciationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectDenunciationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
