import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { FoodSearchComponent } from './food-search.component';
import { SearchService } from '@app/core/services/search.service';
import { FoodProduct } from '@app/core/models/food-product.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultsComponent } from './search-results/search-results.component';

// Mock SearchService
const mockSearchResults: FoodProduct[] = [
  { productName: 'Test Product', brandName: 'Test Brand', companyName: 'Test Co', ingredientName: 'Test Ing', ingredientBrand: 'Test Ing Brand', infoLink: '' }
];

class MockSearchService {
  search = jasmine.createSpy('search').and.returnValue(mockSearchResults);
}

describe('FoodSearchComponent', () => {
  let component: FoodSearchComponent;
  let fixture: ComponentFixture<FoodSearchComponent>;
  let mockSearchService: MockSearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FoodSearchComponent,
        NoopAnimationsModule,
        // Import the child components to make them known to the test bed
        SearchBarComponent,
        SearchResultsComponent
      ],
      providers: [
        { provide: SearchService, useClass: MockSearchService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FoodSearchComponent);
    component = fixture.componentInstance;
    mockSearchService = TestBed.inject(SearchService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call SearchService when search term is emitted from SearchBarComponent', () => {
    const searchTerm = 'test';
    // The component's template connects the search bar's output to the onSearch method
    component.onSearch(searchTerm);
    fixture.detectChanges();

    expect(mockSearchService.search).toHaveBeenCalledWith(searchTerm);
    expect(component.results().length).toBe(1);
    expect(component.results()[0].productName).toBe('Test Product');
  });

  it('should clear results when search term is empty', () => {
    // First, perform a search
    component.onSearch('test');
    expect(component.results().length).toBe(1);

    // Then, perform an empty search
    component.onSearch('');
    expect(mockSearchService.search).toHaveBeenCalledWith('');
    // Assuming the service returns an empty array for an empty term
    expect(component.results().length).toBe(0);
  });
});
