export interface FoodProduct {
  // Using English properties to avoid template parser issues.
  companyName: string;   // 原: 公司名稱
  brandName: string;     // 原: 品牌名稱
  productName: string;   // 原: 產品名稱
  ingredientName: string;// 原: 原料名稱
  ingredientBrand: string; // 原: 原料品牌
  infoLink: string;        // 原: 相關資訊連結
  calories?: number | string; // 原: 熱量大卡
  regionCode?: string;    // 原: 行政區域代碼
  capacity?: string;      // 原: 容量
}
