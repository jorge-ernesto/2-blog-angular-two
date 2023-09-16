import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNavItemComponent } from './category-nav-item.component';

describe('CategoryNavItemComponent', () => {
  let component: CategoryNavItemComponent;
  let fixture: ComponentFixture<CategoryNavItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryNavItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryNavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
