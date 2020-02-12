import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciationFormComponent } from './denunciation-form.component';

describe('DenunciationFormComponent', () => {
  let component: DenunciationFormComponent;
  let fixture: ComponentFixture<DenunciationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenunciationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenunciationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
