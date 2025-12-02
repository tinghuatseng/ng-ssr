import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { FoodDataService } from './core/services/food-data.service';

export const serverRoutes: ServerRoute[] = [
  // {
  //   path: 'product/:index',
  //   renderMode: RenderMode.Prerender,
  //   async getPrerenderParams() {
  //     const foodDataService = inject(FoodDataService);
  //     const index = foodDataService.productId();
  //     console.log("Prerendering product with index:", index);
  //     return [{ index: index?.toString() || '0' }];
  //   }
  // },
  {
    path: '**',
    renderMode: RenderMode.Server,
  }
];
