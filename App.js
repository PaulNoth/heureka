import React, { useState, useEffect } from 'react';
import { Provider as PaperProvider, Appbar, ToolbarContent } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import ProductScreen from './ProductScreen';
import ShopScreen from './ShopScreen';

export default function App() {
  const [screenIndex, setSceenIndex] = useState(0);

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content
          title="Heureka"
        />
      </Appbar.Header>
      <Swiper showsPagination={false} loop={true} bounces={true} onIndexChanged={index => setSceenIndex({ index })} >
        <ProductScreen />
        <ShopScreen />
      </Swiper>
    </PaperProvider>
  );
}
