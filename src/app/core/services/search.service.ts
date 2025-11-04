import { Injectable, inject, Signal } from '@angular/core';
import { FoodDataService } from '@app/core/services/food-data.service';
import { FoodProduct } from '@app/core/models/food-product.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private foodDataService = inject(FoodDataService);
  private allProducts: Signal<FoodProduct[]> = this.foodDataService.products;

  constructor() { }

  search(term: string): FoodProduct[] {
    if (!term.trim()) {
      return [];
    }

    const lowerCaseTerm = term.toLowerCase();
    const products = this.allProducts();

    const results = products.filter(product =>
      product.productName.toLowerCase().includes(lowerCaseTerm) ||
      product.brandName.toLowerCase().includes(lowerCaseTerm)
    );

    const isBrandSearch = results.length > 0 && results.every(p =>
      p.brandName.toLowerCase().includes(lowerCaseTerm)
    );

    if (isBrandSearch) {
      return results.slice().sort((a, b) => {
        if (a.productName < b.productName) return -1;
        if (a.productName > b.productName) return 1;
        return 0;
      });
    }

    return results;
  }
}
