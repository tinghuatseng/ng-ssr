import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FoodDataService } from '@app/core/services/food-data.service';
import { FoodProduct } from '@app/core/models/food-product.model';

describe('FoodDataService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FoodDataService]
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created and fetch and map data on instantiation', () => {
    const service = TestBed.inject(FoodDataService);
    expect(service).toBeTruthy();

    // Mock the raw API response with Chinese keys
    const mockApiData: any[] = [{
      '公司名稱': 'Test Company',
      '品牌名稱': 'Test Brand',
      '產品名稱': 'Test Product',
      '原料名稱': 'Test Ingredient',
      '原料品牌': 'Test Ingredient Brand',
      '相關資訊連結': 'http://example.com',
      '熱量大卡': 100,
      '行政區域代碼': 'A'
    }];

    const req = httpMock.expectOne('/api/food-ingredients.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockApiData);

    // Check the mapped data in the signal
    expect(service.products().length).toBe(1);
    const product = service.products()[0];
    expect(product.productName).toBe('Test Product');
    expect(product.brandName).toBe('Test Brand');
    expect(product.companyName).toBe('Test Company');
  });
});
