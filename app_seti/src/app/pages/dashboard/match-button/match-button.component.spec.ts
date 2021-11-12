import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchButtonComponent } from './match-button.component';

describe('MatchButtonComponent', () => {
  let component: MatchButtonComponent;
  let fixture: ComponentFixture<MatchButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
