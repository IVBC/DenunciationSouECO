import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenuciationFetchComponent } from './denuciation-fetch.component';

describe('DenuciationFetchComponent', () => {
  let component: DenuciationFetchComponent;
  let fixture: ComponentFixture<DenuciationFetchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenuciationFetchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenuciationFetchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
