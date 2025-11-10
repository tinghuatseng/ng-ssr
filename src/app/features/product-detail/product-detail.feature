Feature: product detail page

Background:
  Given user is request products search
  And choose a product

Scenario: loading food ingredient in product detail page
  Given a food ingredient data
  When navigate to product detail page
  Then display food ingredient information
  And data is pass by component parameter without api request

  Examples:
  |公司名稱|產品名稱|原料名稱|原料品牌|每一份量|熱量大卡|相關資訊連結|
  |--------|--------|--------|--------|--------|--------|--------|
  |怡客咖啡股份有限公司|冰滴咖啡|阿拉比卡咖啡豆|怡客|200ml|100|[link](https://example.com)|
