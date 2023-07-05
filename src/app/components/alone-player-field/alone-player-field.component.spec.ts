import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlonePlayerFieldComponent } from './alone-player-field.component';

describe('AlonePlayerFieldComponent', () => {
  let component: AlonePlayerFieldComponent;
  let fixture: ComponentFixture<AlonePlayerFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlonePlayerFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlonePlayerFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
