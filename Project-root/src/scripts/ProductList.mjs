import { renderListWithTemplate } from './utils.mjs';

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.getData();
        this.renderList(list);
    }

    async getData() {
        return this.dataSource; // Simulating an actual data fetch for simplicity
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="product_pages/?product=${product.id}">
            <img src="${product.image}" alt="Image of ${product.name}">
            <h2 class="card__brand">${product.brand}</h2>
            <h3 class="card__name">${product.name}</h3>
            <p class="product-card__price">$${product.price}</p>
        </a>
    </li>`;
}