import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyFormLibComponent } from './easy-form-lib.component';

describe('EasyFormLibComponent', () => {
  let component: EasyFormLibComponent;
  let fixture: ComponentFixture<EasyFormLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EasyFormLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EasyFormLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
