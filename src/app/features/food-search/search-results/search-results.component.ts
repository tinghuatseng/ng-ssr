import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodProduct } from '@app/core/models/food-product.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>產品名稱</th>
          <th>品牌名稱</th>
          <th>容量</th>
          <th>原料名稱</th>
          <th>原料品牌</th>
          <th>熱量</th>
        </tr>
      </thead>
      <tbody>
        @for (product of results(); track $index) {
          <tr>
            <td>{{ product.index }}</td>
            <td>
              <a [routerLink]="['/product', product.index]" class="w-full">
                {{ product.productName }}
              </a>
            </td>
            <td>{{ product.brandName }}</td>
            <td>{{ product.capacity }}</td>
            <td>{{ product.ingredientName }}</td>
            <td>{{ product.ingredientBrand }}</td>
            <td>{{ product.calories }}</td>
          </tr>
        }
      </tbody>
    </table>

  `,
})
export class SearchResultsComponent {
  results = input.required<FoodProduct[]>();
}
