import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenuciationFindComponent } from './denuciation-find.component';

describe('DenuciationFindComponent', () => {
  let component: DenuciationFindComponent;
  let fixture: ComponentFixture<DenuciationFindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenuciationFindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenuciationFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
