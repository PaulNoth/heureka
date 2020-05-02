import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ececec',
    },
});

export default function ShopScreen() {
    return (
        <View style={styles.container}>
            <Text>Najlacnejsi produkt</Text>
        </View>
    );
}
