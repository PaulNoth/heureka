import React, { useState, useRef } from 'react';
import { Provider as PaperProvider, Appbar, Button } from 'react-native-paper';
import {
  StyleSheet, View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import ProductScreen from './ProductScreen';
import ShopScreen from './ShopScreen';

const styles = StyleSheet.create({
  buttonColorActive: {
    borderBottomColor: 'white',
    borderBottomWidth: 4,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    flex: 1,
  },
  buttonColor: {
    // borderBottomColor: 'white',
    // borderBottomWidth: 4,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    flex: 1,
  },
  alignmentButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 0,
    marginBottom: 0,
  },
});

export default function App() {
  const [screenIndex, setSceenIndex] = useState(0);

  const swiperRef = useRef(null);

  const onMenuClick = (index) => {
    swiperRef.current.scrollBy((screenIndex - index) * -1);
  };

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content
          title="Heureka"
          subtitle="Pre potraviny"
        />
      </Appbar.Header>
      <View style={styles.alignmentButtons}>
        <Button compact uppercase={false} icon="magnify" mode="contained" style={screenIndex === 0 ? styles.buttonColorActive : styles.buttonColor} onPress={() => onMenuClick(0)}>Najlacnejší produkt</Button>
        <Button compact uppercase={false} icon="cart-outline" mode="contained" style={screenIndex === 1 ? styles.buttonColorActive : styles.buttonColor} onPress={() => onMenuClick(1)}>Môj nákup</Button>
      </View>
      <Swiper
        ref={swiperRef}
        showsPagination={false}
        loop
        bounces
        onIndexChanged={(index) => setSceenIndex(index)}
      >
        <ProductScreen />
        <ShopScreen />
      </Swiper>
    </PaperProvider>
  );
}
