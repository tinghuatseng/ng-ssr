import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultsComponent } from './search-results.component';
import { FoodProduct } from '@app/core/models/food-product.model';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  const mockResults: FoodProduct[] = [
    { productName: 'Product A', brandName: 'Brand X', companyName: 'Company', ingredientName: 'Ing', ingredientBrand: 'Ing Brand', infoLink: '' },
    { productName: 'Product B', brandName: 'Brand Y', companyName: 'Company', ingredientName: 'Ing', ingredientBrand: 'Ing Brand', infoLink: '' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultsComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // Set required input before first change detection
    fixture.componentRef.setInput('results', []);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display a list of products when results are provided', () => {
    // Set the input signal's value for this test
    fixture.componentRef.setInput('results', mockResults);
    fixture.detectChanges();

    const listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(2);
    expect(listItems[0].nativeElement.textContent).toContain('Product A');
    expect(listItems[0].nativeElement.textContent).toContain('Brand X');
    expect(listItems[1].nativeElement.textContent).toContain('Product B');
  });

  it('should display nothing when results are empty', () => {
    // Set the input signal's value for this test
    fixture.componentRef.setInput('results', []);
    fixture.detectChanges();

    const listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(0);
  });
});
