import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParams } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import search from './productSearch.mjs';

const productId = getParams("product");
const searchTerm = getParams("search");
const tentDataSource = new ProductData("tents");
const backpackDataSource = new ProductData("backpacks");
const sleepingBagDataSource = new ProductData("sleeping-bags");

const renderProductPage = async () => {
  const backpack = await backpackDataSource.findProductById(productId);
  const tent = await tentDataSource.findProductById(productId);
  const sleepingBag = await sleepingBagDataSource.findProductById(productId);
  let product;
  if (backpack) {
    product = new ProductDetails(productId, backpackDataSource);
  }
  if (tent) {
    product = new ProductDetails(productId, tentDataSource);
  }
  if (sleepingBag) {
    product = new ProductDetails(productId, sleepingBagDataSource);
  }
  product.init();

}


if(productId){
  renderProductPage();
}

if(searchTerm){
  search(searchTerm);
}

loadHeaderFooter();
