import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FoodProduct } from '@app/core/models/food-product.model';
import { map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodDataService {
  private http = inject(HttpClient);

  private productsSignal = signal<FoodProduct[]>([]);
  public products = this.productsSignal.asReadonly();

  public fetchProducts(): Observable<FoodProduct[]> {
    console.log("Fetching products from FoodDataService");
    if( this.productsSignal().length > 0 ) {
      return new Observable<FoodProduct[]>(subscriber => {
        subscriber.next(this.productsSignal());
        subscriber.complete();
      });
    }
    return this.http.get<any[]>('/api/food-ingredients')
      .pipe(
        map(apiProducts => apiProducts.map(p => ({
          companyName: p.公司名稱,
          brandName: p.品牌名稱,
          productName: p.產品名稱,
          ingredientName: p.原料名稱,
          ingredientBrand: p.原料品牌,
          infoLink: p.相關資訊連結,
          calories: p.熱量大卡,
          regionCode: p.行政區域代碼,
          capacity: p.每一份量,
          index: p.index
        } as FoodProduct))),
        tap(mappedData => this.productsSignal.set(mappedData)),
        take(1)
      );
  }

  public getProductByIndex(index: number) {
    return this.products().find(product => product.index === index) || null;
  }
}
