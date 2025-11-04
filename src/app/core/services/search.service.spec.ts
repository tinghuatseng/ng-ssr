import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { SearchService } from '@app/core/services/search.service';
import { FoodDataService } from '@app/core/services/food-data.service';
import { FoodProduct } from '@app/core/models/food-product.model';

// Mock FoodDataService with the new English-keyed model
const mockProducts: FoodProduct[] = [
  { productName: '摩斯漢堡', brandName: '摩斯漢堡', companyName: '安心食品', ingredientName: '麵包', ingredientBrand: '統一', infoLink: '' },
  { productName: '辣味摩斯漢堡', brandName: '摩斯漢堡', companyName: '安心食品', ingredientName: '麵包', ingredientBrand: '統一', infoLink: '' },
  { productName: '茶葉蛋', brandName: '全家便利商店', companyName: '全家', ingredientName: '雞蛋', ingredientBrand: '大成', infoLink: '' },
  { productName: '超級大麥雙手卷', brandName: '全家便利商店', companyName: '全家', ingredientName: '米', ingredientBrand: '池上', infoLink: '' },
];

class MockFoodDataService {
  products = signal<FoodProduct[]>(mockProducts);
}

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchService,
        { provide: FoodDataService, useClass: MockFoodDataService }
      ]
    });
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test for US-1: Fuzzy search for products
  it('should perform a low-precision fuzzy search on product name', () => {
    const results = service.search('漢堡');
    expect(results.length).toBe(2);
    expect(results.map(r => r.productName)).toContain('摩斯漢堡');
    expect(results.map(r => r.productName)).toContain('辣味摩斯漢堡');
  });

  it('should return an empty array if no product matches', () => {
    const results = service.search('披薩');
    expect(results.length).toBe(0);
  });

  // Test for US-2: Search for brands
  it('should find products by brand name', () => {
    const results = service.search('全家');
    expect(results.length).toBe(2);
    expect(results.every(r => r.brandName === '全家便利商店')).toBeTrue();
  });

  it('should sort products alphabetically by product name when searching for a brand', () => {
    const results = service.search('摩斯');
    expect(results.length).toBe(2);
    // '摩斯漢堡' should come before '辣味摩斯漢堡'
    expect(results[0].productName).toBe('摩斯漢堡');
    expect(results[1].productName).toBe('辣味摩斯漢堡');
  });
});
