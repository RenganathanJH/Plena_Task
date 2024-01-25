import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlashList } from '@shopify/flash-list'
import { serviceCall } from '../service';
import ProductCard from '../components/Card/ProductCard';
import { IProduct } from '../utills/interface';
import { colors } from '../utills/colors';
import { validateArray } from '../utills/helper';
import CheckoutBar from '../components/Card/CheckoutBar';

const Home = () => {
  const [productList, setProductList] = useState([]);

  const renderProductList = ({ item }: { item: IProduct }) => {
    return <ProductCard item={item} />
  }

  const getProductList = async () => {
    const url = "products";
    try {
      const productList = await serviceCall("get", url);
      const updatedData = validateArray(productList?.products) && productList?.products?.map((product: IProduct) => ({ ...product, quantity: 0}));
      setProductList(updatedData);
    } catch (error: any) {
      console.log("Error From Products List", error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <View style={styles.container}>
      <FlashList // FlashList 10x Faster than FlatList
        data={productList}
        renderItem={renderProductList}
        keyExtractor={(_, index) => index?.toString()}
        estimatedItemSize={1000}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <CheckoutBar />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.WHITE,
    flexGrow: 1, 
    flexDirection: 'row'
  },
  footerContainer: {
    backgroundColor: colors.WHITE,
    height: 50,
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingTop: 8
  },
  totalPriceText: {
    fontSize: 14,
    color: colors.GERY_SCALE_BLACK_02,
    fontWeight: "bold",
  }
})