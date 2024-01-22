import ProductData from './ProductData.mjs';
import ProductListing from './ProductList.mjs';

const dataSource = new ProductData('tents');
const element = document.querySelector('.product-list');
const topTentIds = ['880RR', '985RF', '985PR', '344YJ'];
const listing = new ProductListing('Tents', dataSource , element, topTentIds);

listing.init();
