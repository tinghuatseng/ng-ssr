import { Injectable, inject, Signal, signal } from '@angular/core';
import { FoodDataService } from '@app/core/services/food-data.service';
import { FoodProduct } from '@app/core/models/food-product.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private foodDataService = inject(FoodDataService);
  private allProducts: Signal<FoodProduct[]> = signal<FoodProduct[]>([]);

  search(term: string): FoodProduct[] {
    if (!term.trim()) {
      return [];
    }
    this.allProducts = this.foodDataService.products;

    const lowerCaseTerm = term.toLowerCase();
    const products = this.allProducts();

    const results = products.filter(product =>{
      return product.productName.toString().toLowerCase().includes(lowerCaseTerm) ||
      product.brandName.toString().toLowerCase().includes(lowerCaseTerm) ||
      product.ingredientName.toString().toLowerCase().includes(lowerCaseTerm) ||
      product.ingredientBrand.toString().toLowerCase().includes(lowerCaseTerm)
    });

    return results;
  }
}
