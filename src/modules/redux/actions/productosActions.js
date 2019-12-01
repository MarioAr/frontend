import {
    INIT_PAGINATION,
    GET_PRODUCTS,
    GET_PRODUCT,
    DELETE_PRODUCT,
    SET_PRODUCTS,
    RESET,
    SET_PAGINATION_PAGE,
    SET_PAGINATION_MAX_PAGES,
    SET_PAGINATION_MAX_ITEMS
} from '../types';

import * as product from 'modules/utils/storage/storage';


function initPagination(items) {
    const products = product.getProducts();
    
    let maxPages = Math.ceil(products.length / (items)) - 1;

    let productsPagination = products.slice(0, items);
    
    return {
        type: INIT_PAGINATION,
        payload: {
            products,
            maxPages,
            maxItems: items,
            productsPagination
        }
    }
}

function setProduct(o) {

    if (!product.setProduct(o)) {

        return {
            type: 'ERROR'
        }
    } 

    return getProducts();
}

function getProducts() {
    const products = product.getProducts();

    return {
        type: GET_PRODUCTS,
        payload: {data: products}
    }
}

function setPaginationPage(page) {


    return (dispatch, getState) => {
        let productsStore = getState().products;
        let { products, maxItems } = productsStore;
        let productsPagination = products.slice(page*maxItems, maxItems);

        dispatch( {
            type: SET_PAGINATION_PAGE,
            payload: {page, productsPagination}
        })
    }
}

function deleteProduct(id) {
     if (!product.deleteProduct(id)) {
        return {
            type: 'ERROR'
        }
    }

    return (dispatch, getState) => {
        let productsStore = getState().products;
        let { maxItems, page } = productsStore;

        const products = product.getProducts();
        let currentPage = page;

        let maxPages = Math.ceil(products.length / (maxItems)) - 1;

        if (maxPages < page) {
            currentPage = page - 1;
        }

        let productsPagination = products.slice(currentPage * maxItems, maxItems);
        console.log(productsPagination)
        dispatch( {
            type: DELETE_PRODUCT,
            payload: {
                page: currentPage,
                productsPagination,
                maxPages
            }
        })
    }
}
export {
    initPagination,
    setProduct,
    // updateProduct,
    getProducts,
    // getProduct,
    deleteProduct,
    // reset,
    setPaginationPage,
    // setPaginationMaxPages,
    // setPaginationMaxItems
}