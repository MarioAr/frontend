// module.exports = 
import { find } from 'lodash';

const PRODUCTS = 'products';

/**
 * 
 */
function getProducts() {
    
    try {
        let products = localStorage.getItem(PRODUCTS);
        
        products = JSON.parse(products);

        products = Array.isArray(products) ? products : [];

        return products;

    } catch (error) {
        return [];
    }
}

function getProduct(id) {
    const products = getProducts();

    return find(products, {id});
}

/**
 * 
 * @param {*} product 
 */
function setProduct(product) {
    let products;

    if (!_validateProduct(product)) {
        return false;
    }

    try {
        products = getProducts();
        
        
        products.unshift(product);
        
        localStorage.setItem(PRODUCTS, JSON.stringify(products));

        return true;

    } catch (error) {
        console.log(error.toString())
        return false;
    }
}

/**
 * 
 * @param {*} id 
 */
function deleteProduct(id) {
    // VALIDAR ID
    try {
        let products = getProducts();
        
        // let productsReduce = products.filter(product => product.id != id);
        let productsReduce = products.filter(product => {
            
            return product.id !== id;
        });

        if (products.length === productsReduce.length) {
            return false;
        }
        
        localStorage.setItem(PRODUCTS, JSON.stringify(productsReduce));

        return true;
    } catch (error) {
        return false;
    }

} 

/**
 * 
 * @param {*} product 
 */
function updateProduct(product) {
    
    if (!_validateProduct(product)) {
        return false;
    }

    try {
        let products = getProducts();

        products = products.map(item => {
            if (item.id === product.id) {
                return product;
            }

            return item;
        });

        localStorage.setItem(PRODUCTS, JSON.stringify(products));

        return true;
    } catch (error) {
        return false;
    }
}








/**
 * 
 * @param {*} product 
 */
function _validateProduct(product) {

    return true;
}




export {
    getProducts,
    getProduct,
    setProduct,
    deleteProduct,
    updateProduct
}



// db.zips.aggregate([{$group: {_id: {estado: "$state", city: "$city"}}, {count: {$sum:  1}}}])