import * as c from "../config/constants";

// Add Fetched Products
export const addProducts = (products) => ({
    type: c.PRODUCTS_AVAILABLE,
    products
});

// Add Product - CREATE (C)
export const addProduct = (product) => ({
    type: c.ADD_PRODUCT,
    product
});

// Update Product - UPDATE (U)
export const updateProduct = (product) => ({
    type: c.UPDATE_PRODUCT,
    product
});

// Delete Product - DELETE (D)
export const deleteProduct = (id) => ({
    type: c.DELETE_PRODUCT,
    id
});