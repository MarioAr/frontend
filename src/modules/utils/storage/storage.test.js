const product = require('./storage');
// import { getProducts } from './storage.js';

// console.log(product)
describe('Tets products', () => {

    test('GET PRODUCTS', () => {
        expect(Array.isArray(product.getProducts())).toBe(true);
    });

    test('INSERT PRODUCT', () => {
        expect(product.setProduct(1)).toBe(true)
    })
})