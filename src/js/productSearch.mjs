import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import {loadHeaderFooter } from './utils.mjs';

const element = document.querySelector("main");

loadHeaderFooter();


const tentDataSource = new ProductData("tents");
const backpackDataSource = new ProductData("backpacks");
const sleepingBagDataSource = new ProductData("sleeping-bags");

export default async function search(searchTerm){
  let searchContainer = document.createElement('div');
  searchContainer.classList.add('search-results');
  let searchList = document.createElement('ul');
  searchList.classList.add('product-list');

  let tentIds = await tentDataSource.findProductIdByName(searchTerm);
  let backpackIds = await backpackDataSource.findProductIdByName(searchTerm);
  let sleepingBagIds = await sleepingBagDataSource.findProductIdByName(searchTerm);
  if(tentIds.length > 0){
    const tents = new ProductListing("Search Results", tentDataSource, searchList, tentIds);
    tents.init();
  }
  if(backpackIds.length > 0){
    const backpacks = new ProductListing("Search Results", backpackDataSource, searchList, backpackIds);
    backpacks.init();
  }
  if(sleepingBagIds.length > 0){
    const sleepingBags = new ProductListing("Search Results", sleepingBagDataSource, searchList, sleepingBagIds);
    sleepingBags.init();
  }
  if(tentIds.length === 0 && backpackIds.length === 0 && sleepingBagIds.length === 0){
    let noResults = document.createElement('h2');
    noResults.innerText = "No Results Found";
    searchContainer.appendChild(noResults);
  }

  searchContainer.appendChild(searchList);
  element.appendChild(searchContainer);

}

