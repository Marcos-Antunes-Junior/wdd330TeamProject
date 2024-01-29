function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  async findProductById(id) {
    let products = await this.getData();
    if(products.Result){
      products = products.Result;
    }
    return products.find((item) => item.Id === id);
  }

  async findProductIdByName(name) {
    let products = await this.getData();
    if(products.Result){
      products = products.Result;
    }
    return products.filter((item) => item?.Name?.toLowerCase()?.includes(name?.toLowerCase())).map(item => item.Id);
  }
}
