import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { IProduct } from '../../utills/interface'
import { colors } from '../../utills/colors'

const ProductCard = ({ item }: { item: IProduct}) => {
  return (
    <View style={styles.cardContainer}>
      <Text>ProductCard</Text>
    </View>
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
        paddingTop: 13
    }
})