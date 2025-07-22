import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubtTabComponent } from './doubt-tab.component';

describe('DoubtTabComponent', () => {
  let component: DoubtTabComponent;
  let fixture: ComponentFixture<DoubtTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoubtTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoubtTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
