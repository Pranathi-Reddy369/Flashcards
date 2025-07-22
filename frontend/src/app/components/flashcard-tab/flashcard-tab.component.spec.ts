import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardTabComponent } from './flashcard-tab.component';

describe('FlashcardTabComponent', () => {
  let component: FlashcardTabComponent;
  let fixture: ComponentFixture<FlashcardTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashcardTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
