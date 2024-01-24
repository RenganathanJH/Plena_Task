import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { IProduct } from '../../utills/interface'
import { colors } from '../../utills/colors'
import { SVG } from '../../assets/images/svg'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, cartDecrement, getFavoriteProduct, cartIncrement } from '../../redux/reducers/cartReducer'
import { useNavigation } from '@react-navigation/native'
import { RouteNames } from '../../routes/RouteName'
import { validateArray } from '../../utills/helper'
import CartButton from './CartButton'

const ProductCard = ({ item }: { item: IProduct }) => {
  const { favoriteProduct, cartItems } = useSelector((state) => state?.cart);
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  function onPressFavourite() {
    dispatch(getFavoriteProduct({
      id: item?.id,
      isFavourite: favoriteProduct ? !favoriteProduct[item?.id] : true
    }))
  };

  function onPressCard() {
    navigation?.navigate(RouteNames.PRODUCT_DETAILS_SCREEN, { productData: item });
  }

  function onPressAddCart(item: IProduct) {
    dispatch(addToCart(item));
  }

  const matchingProduct = validateArray(cartItems) && cartItems?.find((cart: IProduct) => cart?.id === item?.id);

  return (
    <Pressable style={styles.cardContainer} onPress={onPressCard}>
      {/* Favourite Icon */}
      <Pressable style={styles.favouriteIconContainer} onPress={onPressFavourite}>
        {favoriteProduct && favoriteProduct[item?.id] ? <SVG.FavouriteIcon width={16} height={16} /> : <SVG.UnFavouriteIcon width={16} height={16} />}
      </Pressable>
      {/* Empty Image */}
      <View>
        {item?.thumbnail ? <Image source={{ uri: item?.thumbnail }} resizeMode="cover" style={styles.productImageStyle} /> : <SVG.EmptyImageIcon width={68} height={68} />}
      </View>
      {matchingProduct && matchingProduct?.id === item?.id ? (
        <CartButton item={item} matchingProduct={matchingProduct} />
      ) : (
        <Pressable style={styles.cartPlusContainer} onPress={() => onPressAddCart(item)}>
          <SVG.PlusIcon color={colors.WHITE} />
        </Pressable>
      )}
      {/* Produt Price and Title */}
      <View style={styles.bodyContainer}>
        <Text style={styles.priceText}>{"$" + item?.price || ""}</Text>
        <Text style={styles.titleText}>{item?.title || ""}</Text>
      </View>
    </Pressable>
  )
}

export default memo(ProductCard);

const styles = StyleSheet.create({
  cardContainer: {
    width: 160,
    height: 194,
    borderRadius: 8,
    borderWidth: 0.2,
    backgroundColor: colors.GREY_SCALE_05,
    marginVertical: 16,
    paddingLeft: 17,
    paddingRight: 31,
    paddingBottom: 20,
    paddingTop: 13,
    justifyContent: "center",
    alignItems: "center"
  },
  favouriteIconContainer: {
    position: "absolute",
    left: 13,
    top: 13
  },
  bodyContainer: {
    position: "absolute",
    bottom: 10,
    left: 17,
    width: 130
  },
  priceText: {
    fontFamily: "Manrope",
    fontSize: 14,
    color: colors.GREY_SCALE_BLACK,
    fontWeight: "bold",
  },
  titleText: {
    fontFamily: "Manrope",
    fontSize: 12,
    color: colors.GERY_SCALE_BLACK_02,
    fontWeight: "400",
    marginTop: 4
  },
  cartPlusContainer: {
    width: 24,
    height: 24,
    backgroundColor: colors.PRIMARY_LIGHT_BLUE,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 36,
    right: 15,
    zIndex: 999
  },
  productImageStyle: {
    width: 68,
    height: 68,
    borderRadius: 12
  },
})