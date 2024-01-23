import { serviceCall } from "../../service"

export const getProductList = async () => {
    const url = "products";
    try {
        const productList = await serviceCall("get", url);
        return productList;
    } catch (error: any) {
        console.log("Error From Products List", error?.response?.data?.message);
    }
};