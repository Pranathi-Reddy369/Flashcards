import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpWidgetComponent } from './help-widget.component';

describe('HelpWidgetComponent', () => {
  let component: HelpWidgetComponent;
  let fixture: ComponentFixture<HelpWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
