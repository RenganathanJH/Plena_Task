import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { fonts } from '../../utills/fonts'
import { colors } from '../../utills/colors'
import { useSelector } from 'react-redux'
import { getTotalPrice, validateArray } from '../../utills/helper'

const CheckoutBar = () => {
    const cartItems = useSelector((state) => state?.cart?.cartItems);
    const totalPrice = getTotalPrice(cartItems);
    if (validateArray(cartItems))
    return (
        <View style={styles.billContainer}>
            <Text style={styles.cartItemText}>{cartItems?.length + " " + "Items"}</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.totalPriceText}>{"Total"}</Text>
                <Text style={styles.priceText}>{"$" + (parseFloat((totalPrice?.toFixed(2))).toLocaleString() || 0)}</Text>
            </View>
        </View>
    )
}

export default CheckoutBar

const styles = StyleSheet.create({
    billContainer: {
        width: 359,
        height: 100,
        backgroundColor: colors.GREY_SCALE_05,
        alignSelf: "center",
        marginTop: 100,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        paddingTop: 17,
        paddingHorizontal: 36,
        position: "absolute",
        bottom: 0,
    },
    totalPriceText: {
        fontFamily: fonts.manrope_regular,
        fontSize: 14,
        fontWeight: "400",
        color: colors.GERY_SCALE_BLACK_02
    },
    priceText: {
        fontFamily: fonts.manrope_regular,
        fontSize: 14,
        fontWeight: "500",
        color: colors.GREY_SCALE_BLACK
    },
    cartItemText: {
        fontSize: 14,
        color: colors.GREY_SCALE_BLACK,
        fontWeight: "bold",
    },
    priceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    }
})