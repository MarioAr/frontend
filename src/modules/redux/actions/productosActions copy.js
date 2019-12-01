import {
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



function setProduct(o) {

    if (!product.setProduct(o)) {

        return {
            type: 'ERROR'
        }
    } 

    return getProducts();
}

function updateProduct(o) {

    if (product.deleteProduct(o.id) && product.setProduct(o)) {
        return {
            type: SET_PRODUCTS,
            payload: {
                ...getProducts().payload,
                    error: false
                }
            }
    }

     return {
            type: 'ERROR'
        }
}

function getProducts() {
    const products = product.getProducts();

    return {
        type: GET_PRODUCTS,
        payload: {data: products}
    }
}


function getProduct(id) {
    const products = product.getProduct(id);

    return {
        type: GET_PRODUCT,
        payload: {data: products}
    }
}


function deleteProduct(id) {

    if (!product.deleteProduct(id)) {
        return {
            type: 'ERROR'
        }
    }

    return setPaginationMaxPages();
    return (dispatch, getState) => {
        

        dispatch({
            type: DELETE_PRODUCT,
            payload: {
                data: product.getProducts()
            }
        })
    }


    // if (!product.deleteProduct(id)) {
    //     return {
    //         type: 'ERROR'
    //     }
    // }

    let products = product.getProducts();

    return {
        type: GET_PRODUCTS,
        payload: { data: products }
    }
}

function reset() {

    return {
        type: RESET
    }
}

function setPaginationPage(page) {


    return (dispatch, getState) => {
        let productsStore = getState().products;
        let { products, maxItems } = productsStore;
        let productsPagination = products.slice(page, maxItems)
        dispatch( {
            type: SET_PAGINATION_PAGE,
            payload: {page, productsPagination}
        })
    }
    return {
        type: SET_PAGINATION_PAGE,
        payload: page
    }
}

function setPaginationMaxPages(maxPages) {

    return (dispatch, getState) =>{

        const { products, maxItems } = getState().products;

        let maxPages = Math.ceil(products.length / (maxItems)) - 1;
     
        dispatch( {
            type: SET_PAGINATION_MAX_PAGES,
            payload: maxPages
        })
    }
}

function setPaginationMaxItems(maxItems) {
    
    return {
            type: SET_PAGINATION_MAX_ITEMS,
            payload: maxItems
        }
}

export {
    setProduct,
    updateProduct,
    getProducts,
    getProduct,
    deleteProduct,
    reset,
    setPaginationPage,
    setPaginationMaxPages,
    setPaginationMaxItems
}