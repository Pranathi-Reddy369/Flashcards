import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceTabComponent } from './resource-tab.component';

describe('ResourceTabComponent', () => {
  let component: ResourceTabComponent;
  let fixture: ComponentFixture<ResourceTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
