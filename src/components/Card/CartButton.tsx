import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { IProduct } from '../../utills/interface';
import { cartDecrement, cartIncrement } from '../../redux/reducers/cartReducer';
import { SVG } from '../../assets/images/svg';
import { colors } from '../../utills/colors';

interface ICartButton {
    item: IProduct;
    matchingProduct: IProduct;
    cartStyle?: StyleProp<ViewStyle>;
    bgColor?: string;
    iconColor?: string;
}

const CartButton = ({ item, matchingProduct, cartStyle, bgColor = colors.PRIMARY_LIGHT_BLUE, iconColor = colors.WHITE }: ICartButton) => {
    const dispatch = useDispatch();

    function onPressIncrement(item: IProduct) {
        dispatch(cartIncrement(item));
    }

    function onPressDecrement(item: IProduct) {
        dispatch(cartDecrement(item));
    }

    return (
        <View style={[styles.cartIconContainer, cartStyle]}>
            <Pressable style={[styles.minusContainer, { backgroundColor: bgColor }]} onPress={() => onPressDecrement(item)}>
                <SVG.MinusIcon color={iconColor} />
            </Pressable>
            <Text style={styles.quantityText}>{matchingProduct?.quantity || item?.quantity}</Text>
            <Pressable style={[styles.plusIconContainer, { backgroundColor: bgColor }]} onPress={() => onPressIncrement(item)}>
                <SVG.PlusIcon color={iconColor} />
            </Pressable>
        </View>
    )
}

export default CartButton

const styles = StyleSheet.create({
    plusIconContainer: {
        width: 24,
        height: 24,
        backgroundColor: colors.PRIMARY_LIGHT_BLUE,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    minusContainer: {
        width: 24,
        height: 24,
        backgroundColor: colors.PRIMARY_LIGHT_BLUE,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    cartIconContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: 100,
        height: 40,
        position: 'absolute',
        bottom: 26,
        right: 0,
        zIndex: 999
    },
    quantityText: {
        color: colors.GREY_SCALE_BLACK
    }
})