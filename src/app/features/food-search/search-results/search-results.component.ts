import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodProduct } from '@app/core/models/food-product.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <ul class="divide-y divide-gray-200">
      @for (product of results(); track $index) {
        <li class="py-4 flex">
          <a [routerLink]="['/product', product.productName]" class="w-full">
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900">{{ product.productName }}</p>
              <p class="text-sm text-gray-500">{{ product.brandName }}</p>
              <p class="text-sm text-gray-500">{{ product.capacity }}</p>
            </div>
          </a>
        </li>
      }
    </ul>
  `,
})
export class SearchResultsComponent {
  results = input.required<FoodProduct[]>();
}
