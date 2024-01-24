export const validateArray = (arr: any) => {
    if (arr && Array.isArray(arr) && arr?.length > 0) {
        return true;
    } else {
        return false;
    }
};

export const getTotalPrice = (cart: any[]) => {
    let totalPrice = 0;
    if (validateArray(cart)) {
        cart.forEach((cartItem) => {
            totalPrice += (cartItem?.price * cartItem?.quantity);
        });
    }
    return totalPrice;
}