import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlashList } from '@shopify/flash-list'
import { serviceCall } from '../service';
import ProductCard from '../components/Card/ProductCard';
import { IProduct } from '../utills/interface';
import { colors } from '../utills/colors';

const Home = () => {
  const [productList, setProductList] = useState([]);

  const renderProductList = ({ item }: { item: IProduct }) => {
    return <ProductCard item={item} />
  }

  const getProductList = async () => {
    const url = "products";
    try {
      const productList = await serviceCall("get", url);
      setProductList(productList?.products);
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
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    flexGrow: 1, flexDirection: 'row'
  }
})