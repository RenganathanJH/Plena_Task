import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../utills/colors'
import { SVG } from '../assets/images/svg'
import { string } from '../utills/string'
import { useSelector } from 'react-redux'
import { fonts } from '../utills/fonts'
import { validateArray } from '../utills/helper'
import { IProduct } from '../utills/interface'
import { useNavigation } from '@react-navigation/native'
import CartButton from '../components/Card/CartButton'
import CheckoutBar from '../components/Card/CheckoutBar'
import { FlashList } from '@shopify/flash-list'

const Cart = () => {
  const cartItems = useSelector((state) => state?.cart?.cartItems);
  const navigation: any = useNavigation();

  function onPressGoBack() {
    navigation?.goBack();
  }

  function renderCartItem({ item }: { item: IProduct }) {
    const matchingProduct = validateArray(cartItems) && cartItems?.find((cart: IProduct) => cart?.id === item?.id);
    return (
      <View key={item?.id} style={styles.cartItemSubContainer}>
        <View style={styles.imageAndPriceContainer}>
          <Image source={{ uri: item?.thumbnail }} resizeMode={"contain"} style={styles.productImageStyle} />
          <View style={styles.priceAndTitleContainer}>
            <Text style={styles.titleText}>{item?.title || ""}</Text>
            <Text style={styles.priceText}>{"$" + item?.price || ""}</Text>
          </View>
        </View>
        <CartButton
          item={item}
          matchingProduct={matchingProduct}
          bgColor={colors.GREY_SCALE_05}
          iconColor={colors.GREY_SCALE_BLACK}
          cartStyle={styles.cartStyle}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Icon and Title Container */}
      <Pressable style={styles.iconAndTitleContainer} onPress={onPressGoBack}>
        <SVG.BackIcon />
        <Text style={styles.shoppingCartLabelText}>{string.cartScreen.shoppingCartLabel + " " + `(${cartItems?.length})`}</Text>
      </Pressable>
      {/* CartItems Container */}
      <FlashList
        estimatedItemSize={200}
        data={cartItems}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderCartItem}
        contentContainerStyle={styles.cartItemContainer}
      />
      {/* Bill Detail Container */}
      <CheckoutBar />
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingTop: 45,
    flexGrow: 1,
  },
  iconAndTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24
  },
  shoppingCartLabelText: {
    marginLeft: 20,
    fontFamily: fonts.manrope_regular,
    fontSize: 16,
    fontWeight: "400",
    color: colors.GREY_SCALE_BLACK
  },
  cartItemContainer: {
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 150
  },
  cartItemSubContainer: {
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  titleText: {
    fontFamily: fonts.manrope_regular,
    fontSize: 14,
    fontWeight: "500",
    color: colors.GREY_SCALE_BLACK,
    width: 200
  },
  priceText: {
    fontFamily: fonts.manrope_regular,
    fontSize: 14,
    fontWeight: "400",
    color: colors.GREY_SCALE_BLACK
  },
  productImageStyle: {
    width: 30,
    height: 30,
    borderRadius: 8
  },
  imageAndPriceContainer: {
    flexDirection: "row",
  },
  priceAndTitleContainer: {
    marginLeft: 12
  },
  cartStyle: {
    position: "absolute",
    top: 0,
    zIndex: 0,
    right: -14,
  },
})