import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciationListComponent } from './denunciation-list.component';

describe('DenunciationListComponent', () => {
  let component: DenunciationListComponent;
  let fixture: ComponentFixture<DenunciationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenunciationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenunciationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
