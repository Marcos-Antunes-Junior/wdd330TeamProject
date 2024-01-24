import {renderListWithTemplate} from './utils.mjs';

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Image}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.FinalPrice}</p></a>
</li>`;
}

export default class ProductListing {
  constructor(category, dataSource, listElement, idFilter = []) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.idFilter = idFilter;
  }

  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData();
    if(this.idFilter.length === 0) {
      this.renderList(list);
      return;
    }
    this.renderList(list.filter(item => this.idFilter.includes(item.Id)));

  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }


}



// const dataSource = new ProductData('tents');

// const init = async () => {
//   const tents = await dataSource.getData();

//   console.log({ tents });
//   const topTentIds = ['880RR', '985RF', '985PR', '344YJ']
//   const productList = document.querySelector('.product-list')
//   const productCardTemplate = document.querySelector('#product-list__card-template');
//   tents.filter(tent => topTentIds.includes(tent.Id)).forEach(product => {
//     const clone = productCardTemplate.content.cloneNode(true);
//     clone.querySelector('.card_product_page').href = `product_pages/index.html?product=${product.Id}`;
//     clone.querySelector('.card__image').src = product.Image.substring(1);
//     clone.querySelector('.card__image').alt = product.NameWithoutBrand;
//     clone.querySelector('.card__name').textContent = product.NameWithoutBrand;
//     clone.querySelector('.card__brand').textContent = product.Brand.Name;
//     clone.querySelector('.product-card__price').textContent = product.FinalPrice;
//     productList.appendChild(clone);
//   });
// }
// init();
