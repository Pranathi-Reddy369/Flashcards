import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedSetsComponent } from './deleted-sets.component';

describe('DeletedSetsComponent', () => {
  let component: DeletedSetsComponent;
  let fixture: ComponentFixture<DeletedSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletedSetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
