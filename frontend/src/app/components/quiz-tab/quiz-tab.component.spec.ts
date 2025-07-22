import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizTabComponent } from './quiz-tab.component';

describe('QuizTabComponent', () => {
  let component: QuizTabComponent;
  let fixture: ComponentFixture<QuizTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
