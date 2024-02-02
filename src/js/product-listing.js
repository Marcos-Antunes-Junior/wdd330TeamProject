import { loadHeaderFooter, getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

loadHeaderFooter();
const category = getParams("category");
const dataSource = new ProductData(category);
const element = document.querySelector(".product-list");
const listing = new ProductListing(category, dataSource, element);

listing.init();
