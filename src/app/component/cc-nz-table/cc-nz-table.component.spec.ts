import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcNzTableComponent } from './cc-nz-table.component';

describe('CcNzTableComponent', () => {
  let component: CcNzTableComponent;
  let fixture: ComponentFixture<CcNzTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcNzTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcNzTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
