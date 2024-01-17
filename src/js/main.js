import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');
const tents = await dataSource.getData();

console.log({tents});
const topTentIds = ['880RR','985RF','985PR','344YJ']
const productList =  document.querySelector('.product-list')
const productCardTemplate = document.querySelector('#product-list__card-template');
tents.filter(tent => topTentIds.includes(tent.Id)).forEach(product => {
  const clone = productCardTemplate.content.cloneNode(true);
  clone.querySelector('.card_product_page').href = `product_pages/index.html?product=${product.Id}`;
  clone.querySelector('.card__image').src = product.Image.substring(1);
  clone.querySelector('.card__image').alt = product.NameWithoutBrand;
  clone.querySelector('.card__name').textContent = product.NameWithoutBrand;
  clone.querySelector('.card__brand').textContent = product.Brand.Name;
  clone.querySelector('.product-card__price').textContent = product.FinalPrice;
  productList.appendChild(clone);
});
