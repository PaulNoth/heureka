import _uniq from 'lodash/uniq';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { TextInput, IconButton, DefaultTheme, Divider, DataTable, Title } from 'react-native-paper';

import heurekaData from '../data/heureka.json';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ececec',
        flex: 1,
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    textInput: {
        flex: 3,
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
    },
});

const productGroups = _uniq(heurekaData.map((hd) => hd.group));

export default function ShopScreen() {
    const [text, setText] = useState(null);
    const [hidden, setHidden] = useState(true);
    const [products, setProducts] = useState(productGroups);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const onTextType = (t) => {
        if (t.length > 2) {
            const filteredProducts = products.filter((prodName) => prodName.startsWith(text));
            setHidden(false);
            setProducts(filteredProducts);
        } else {
            setProducts(productGroups);
            // setSelectedProduct(null);
            setHidden(true);
        }
        setText(t);
    };

    const selectProduct = (item) => {
        setSelectedProduct(item);
        setHidden(true);
    };

    const getCheapestProducts = () => {
        const productList = heurekaData.filter((hd) => hd.group === selectedProduct);
        const cheapestProducts = productList.sort((a, b) => a.price - b.price);

        return cheapestProducts;
    };

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <View style={{ flex: 1 }}>
                    <Autocomplete
                        hideResults={hidden}
                        data={products}
                        containerStyle={styles.autocompleteContainer}
                        renderItem={({ item, i }) => (
                            <TouchableOpacity key={i} onPress={() => selectProduct(item)}>
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )}
                        // renderSeparator={(props) => <Divider />}
                        renderTextInput={(props) => (
                            <TextInput
                                // style={styles.textInput}
                                mode="flat"
                                placeholder="Hľadaj najlacnejší produkt"
                                value={text}
                                onChangeText={onTextType}
                            />
                        )}
                    />
                </View>
                <IconButton
                    icon="magnify"
                    color={DefaultTheme.colors.primary}
                    size={40}
                    animated
                    onPress={() => console.log('Pressed')}
                />
            </View>
            <View>
                {selectedProduct ? (
                    <>
                        <Title>{selectedProduct}</Title>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Obchod</DataTable.Title>
                                <DataTable.Title>Názov</DataTable.Title>
                                <DataTable.Title numeric>Cena</DataTable.Title>
                            </DataTable.Header>
                            {getCheapestProducts()
                                .slice(0, 5)
                                .map((prod, index) => (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell>{prod.merchant}</DataTable.Cell>
                                        <DataTable.Cell>{prod.name}</DataTable.Cell>
                                        <DataTable.Cell numeric>{`${(prod.price / 100).toFixed(
                                            2
                                        )} €`}</DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                        </DataTable>
                    </>
                ) : null}
            </View>
        </View>
    );
}
