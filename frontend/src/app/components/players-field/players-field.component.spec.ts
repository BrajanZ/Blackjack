import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersFieldComponent } from './players-field.component';

describe('PlayersFieldComponent', () => {
  let component: PlayersFieldComponent;
  let fixture: ComponentFixture<PlayersFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
