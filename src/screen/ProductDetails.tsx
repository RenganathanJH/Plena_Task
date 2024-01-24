import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { colors } from '../utills/colors'
import { SVG } from '../assets/images/svg'
import { useDispatch, useSelector } from 'react-redux'
import { validateArray } from '../utills/helper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { string } from '../utills/string'
import { fonts } from '../utills/fonts'
import { FlashList } from '@shopify/flash-list'
import { IProduct } from '../utills/interface'
import { addToCart, getFavoriteProduct } from '../redux/reducers/cartReducer'
import { RouteNames } from '../routes/RouteName'
import CartButton from '../components/Card/CartButton'

const ProductDetails = () => {
  const { cartItems, favoriteProduct } = useSelector((state) => state?.cart);
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const productData = route?.params?.productData;
  const dispatch = useDispatch();

  const windowWidth = useWindowDimensions().width;
  const sliderRef = useRef<any>(null);
  // Slider state contains active item and offset position
  const [sliderState, setSliderState] = useState({
    item: 0,
    offset: 0,
  });

  // Update slider state on change event
  const slideChanged = (e: any) => {
    const item = Math.round(e.nativeEvent.contentOffset.x / windowWidth);

    setSliderState({
      item: item,
      offset: item * windowWidth,
    });
  };

  function onPressGoBack() {
    navigation?.goBack();
  }

  function onPressFavourite() {
    dispatch(getFavoriteProduct({
      id: productData?.id,
      isFavourite: favoriteProduct ? !favoriteProduct[productData?.id] : true
    }))
  };

  const renderCarosuel = ({ item, index }: { item: string, index: number }) => {
    return (
      <View style={styles.carosuelContainer}>
        <Image source={{ uri: item }} resizeMode="contain" style={styles.carsouelImageStyle} />
      </View>
    )
  }

  // Renders pagination dots
  const dots = () => (
    <View style={styles.dotGroup}>
      {validateArray(productData?.images) && productData?.images?.map((_, index) => (
        <View key={index} style={[styles.dot, sliderState.item === index ? styles.dotActive : null]} />
      ))}
    </View>
  );

  function onPressAddCart(item: IProduct) {
    dispatch(addToCart(item));
  }

  function onPressCart() {
    navigation.navigate(RouteNames.CART_SCREEN)
  }

  const matchingProduct = validateArray(cartItems) && cartItems?.find((cart: IProduct) => cart?.id === productData?.id);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Icon Containers */}
      <View style={styles.iconContainer}>
        <Pressable onPress={onPressGoBack}>
          <SVG.BackIcon />
        </Pressable>
        <Pressable onPress={onPressCart}>
          <SVG.CartBagIcon />
          {validateArray(cartItems) ?
            <View style={styles.cartBagCountContainer}>
              <Text style={styles.countText}>{cartItems?.length}</Text>
            </View> : null}
        </Pressable>
      </View>
      {/* Title Container */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{string.productDetail.title}</Text>
        <Text style={styles.strongTitleText}>{string.productDetail.strongTitle}</Text>
      </View>
      {/* Review Container */}
      <View style={styles.reviewContainer}>
        <SVG.StarIcon />
        <Text style={styles.reviewText}>{string.productDetail.reviewLabel}</Text>
      </View>
      {/* Carosuel Container */}
      <View style={styles.flashListContainer}>
        <FlashList
          estimatedItemSize={200}
          ref={sliderRef}
          data={productData?.images}
          keyExtractor={(_, index) => index?.toString()}
          renderItem={renderCarosuel}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={slideChanged}
        />
        {dots()}
        {/* Favourite Icon Container */}
        <Pressable style={styles.favouriteContainer} onPress={onPressFavourite}>
          {favoriteProduct && favoriteProduct[productData?.id] ? <SVG.FavouriteIcon width={24} height={24} /> : <SVG.UnFavouriteIcon width={24} height={24} />}
        </Pressable>
      </View>
      {/* Price Container */}
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>{"$" + productData?.price || ""}<Text style={{ fontWeight: "400" }}>{"/KG"}</Text></Text>
        <View style={styles.offerTextContainer}>
          <Text style={styles.offerText}>{"$" + productData?.discountPercentage || ""}</Text>
        </View>
      </View>
      {/* Button Container */}
      <View style={styles.buttonContainer}>
        {matchingProduct && matchingProduct?.id === productData?.id ? (
          <CartButton item={productData} matchingProduct={matchingProduct} cartStyle={{ left: 16, bottom: 4 }} />
        ) : (
          <Pressable style={styles.addCartContainer} onPress={() => onPressAddCart(productData)}>
            <Text style={styles.addCartLabelText}>{string.productDetail.addToCartLabel}</Text>
          </Pressable>
        )}
        <Pressable style={styles.buyNowContainer}>
          <Text style={styles.buyNowLabelText}>{string.productDetail.buyNowButtonLabel}</Text>
        </Pressable>
      </View>
      {/* Description Container */}
      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>{string.productDetail.detailSubText}</Text>
        <Text style={styles.descriptionText}>{productData?.description || ""}</Text>
      </View>
    </ScrollView>
  )
}

export default ProductDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 45,
  },
  cartBagCountContainer: {
    backgroundColor: colors.DARK_YELLOW,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    position: "absolute",
    width: 20,
    height: 20,
    top: -10,
    left: 6,
  },
  countText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.WHITE
  },
  titleContainer: {
    marginTop: 21,
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 50,
    fontWeight: "300",
    color: colors.GREY_SCALE_BLACK,
    fontFamily: fonts.manrope_regular
  },
  strongTitleText: {
    fontSize: 50,
    fontWeight: "800",
    color: colors.GREY_SCALE_BLACK,
    fontFamily: fonts.manrope_regular
  },
  reviewContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  reviewText: {
    marginLeft: 8,
    fontFamily: fonts.manrope_regular,
    fontSize: 14,
    fontWeight: "400",
    color: colors.REVIEW_TEXT_COLOR,
  },
  carsouelImageStyle: {
    width: Dimensions.get("window").width,
    height: 207
  },
  flashListContainer: {
    marginTop: 16,
  },
  carosuelContainer: {
    width: Dimensions.get("window").width,
    height: 207
  },
  dotGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    position: "absolute",
    bottom: 10
  },
  dot: {
    width: 40,
    height: 4,
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: colors.GREY_SCALE_05
  },
  dotActive: {
    backgroundColor: colors.DARK_YELLOW,
  },
  favouriteContainer: {
    width: 58,
    height: 58,
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    position: 'absolute',
    right: 35,
    top: 14,
    justifyContent: "center",
    alignItems: "center"
  },
  priceContainer: {
    marginTop: 26,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  priceText: {
    fontFamily: fonts.manrope_regular,
    fontSize: 16,
    fontWeight: "700",
    color: colors.PRIMARY_LIGHT_BLUE
  },
  offerTextContainer: {
    width: 64,
    height: 20,
    backgroundColor: colors.PRIMARY_LIGHT_BLUE,
    marginLeft: 8,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center"
  },
  offerText: {
    fontFamily: fonts.manrope_regular,
    fontSize: 12,
    fontWeight: "400",
    color: colors.WHITE
  },
  buttonContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  addCartContainer: {
    width: 143,
    height: 56,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.PRIMARY_LIGHT_BLUE,
    justifyContent: "center",
    alignItems: "center"
  },
  buyNowContainer: {
    width: 143,
    height: 56,
    borderRadius: 20,
    backgroundColor: colors.PRIMARY_LIGHT_BLUE,
    justifyContent: "center",
    alignItems: "center"
  },
  addCartLabelText: {
    fontFamily: fonts.manrope_regular,
    fontSize: 14,
    fontWeight: "600",
    color: colors.PRIMARY_LIGHT_BLUE
  },
  buyNowLabelText: {
    fontFamily: fonts.manrope_regular,
    fontSize: 14,
    fontWeight: "600",
    color: colors.WHITE
  },
  footerContainer: {
    backgroundColor: colors.WHITE,
    height: 50,
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingTop: 8,
    marginLeft: 20
  },
  cartItemText: {
    fontSize: 14,
    color: colors.GREY_SCALE_BLACK,
    fontWeight: "bold",
  },
  totalPriceText: {
    fontSize: 14,
    color: colors.GERY_SCALE_BLACK_02,
    fontWeight: "bold",
  },
  detailContainer: {
    marginTop: 30,
    paddingHorizontal: 20
  },
  detailText: {
    fontFamily: fonts.manrope_regular,
    fontSize: 16,
    fontWeight: "400",
    color: colors.GREY_SCALE_BLACK
  },
  descriptionText: {
    fontFamily: fonts.manrope_regular,
    fontSize: 16,
    fontWeight: "400",
    color: colors.GREY_SCALE_03,
    marginTop: 4,
    textAlign: "justify"
  }
})