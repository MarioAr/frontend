import {
        INIT_PAGINATION,
        GET_PRODUCTS,
        DELETE_PRODUCT,
        GET_PRODUCT,
        SET_PRODUCTS,
        // SET_PRODUCT,
        UPDATE_PRODUCTS,
        RESET,
        ERROR,
        SET_PAGINATION_PAGE,
        SET_PAGINATION_MAX_PAGES,
        SET_PAGINATION_MAX_ITEMS
    } from '../types';

const defaultState = {
    page: 0,
    maxItems: 0,
    maxPages: 0,
    error: false,
    loading: false,
    edited: false,
    saved: false,
    edit: {},
    products: [],
    productsPagination: []
}


function productos(state = defaultState, action) {

    const { type, payload } = action;
    
    switch(type) {

        case INIT_PAGINATION:

            return {
                ...state,
                products: payload.products,
                maxPages: payload.maxPages,
                maxItems: payload.maxItems,
                productsPagination: payload.productsPagination
            }

        case DELETE_PRODUCT: 

            return {
                ...state,
                page: payload.page,
                maxPages: payload.maxPages,
                productsPagination: payload.productsPagination,
                products: payload.products,
                deleted: payload.deleted
            }
        case GET_PRODUCT:
            let product = payload.data;
            
            return {
                ...state,
                edit: {...product},
                error: false
            }
        case GET_PRODUCTS:
            let products = payload.data || [];
            // let { maxPages } = payload;

            return {
                ...state,
                products,
                // maxPages,
                error: !Array.isArray(products)
            }
        case SET_PRODUCTS:
            let { error } = payload.error;

            return {
                ...state,
                error,
                edited: !error,
                products: payload.data || [],

            }

        // case SET_PRODUCT:

        //     return {
        //         ...state,
        //         products: payload.data,
        //         edited: payload.edited
        //     }
        case UPDATE_PRODUCTS:
            
            return {
                ...state,
                error: payload.error,
                edited: !payload.error,
                productsPagination: payload.productsPagination,
                products: payload.products,
            }
        case RESET:

            return {
                ...state,
                error: false,
                edit: {},
                edited: false,
                saved: false,
                deleted: false
            }

        // case ERROR:

        //     return {
        //         ...state,
        //         error: true
        //     }

        case SET_PAGINATION_PAGE:
            let { page } = payload;
            return {
                ...state,
                page
            }

        case SET_PAGINATION_MAX_PAGES:

            return {
                ...state,
                maxPages: payload.maxPages,
                products: payload.products
            }

        case SET_PAGINATION_MAX_ITEMS:
            
            return {
                ...state,
                maxItems: payload
            }

        case ERROR:

            return {
                ...state,
                ...payload,
                error: true
            }
        default:
            return state;
    }

}

export default productos;