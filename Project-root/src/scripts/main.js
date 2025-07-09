import ProductData from '../public/json/tents.json' assert { type: 'json' };
import ProductList from './ProductList.mjs';

const productListElement = document.getElementById('productList');
const productList = new ProductList('tents', ProductData, productListElement);
productList.init();