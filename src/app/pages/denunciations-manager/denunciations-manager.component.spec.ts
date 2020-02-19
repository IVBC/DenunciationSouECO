import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciationsManagerComponent } from './denunciations-manager.component';

describe('DenunciationsManagerComponent', () => {
  let component: DenunciationsManagerComponent;
  let fixture: ComponentFixture<DenunciationsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenunciationsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenunciationsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
