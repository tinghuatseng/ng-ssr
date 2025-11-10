import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '@app/core/services/search.service';
import { FoodProduct } from '@app/core/models/food-product.model';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FoodDataService } from '@app/core/services/food-data.service';

@Component({
  selector: 'app-food-search',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, SearchResultsComponent],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">食品資訊查詢</h1>
      <app-search-bar (search)="onSearch($event)"></app-search-bar>
      <div class="mt-4">
        <app-search-results [results]="results()"></app-search-results>
      </div>
    </div>
  `,
})
export class FoodSearchComponent  {
  private searchService = inject(SearchService);
  private foodDataService = inject(FoodDataService);

  results = signal<FoodProduct[]>([]);

  constructor() {
    console.log("food-search component created");
  }
  onSearch(term: string): void {
    if (!term) {
      this.results.set([]);
      return;
    }
    this.foodDataService.fetchProducts().subscribe(() => {
      const res = this.searchService.search(term);
      this.results.set(res);
    });
  }
}
