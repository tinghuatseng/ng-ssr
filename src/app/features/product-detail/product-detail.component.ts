import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodDataService } from '@app/core/services/food-data.service';
import { FoodProduct } from '@app/core/models/food-product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private foodDataService = inject(FoodDataService);

  product = signal<FoodProduct | null>(null);

  constructor() {
    this.route.params.subscribe(params => {
      const productIndex = params['index'];

      if (productIndex) {
        const product = this.foodDataService.getProductByIndex(Number.parseInt(productIndex));
        this.product.set(product);
      }
    });
  }
}
