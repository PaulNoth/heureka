import _groupBy from 'lodash/groupBy';
import _sumBy from 'lodash/sumBy';
import _uniq from 'lodash/uniq';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { TextInput, IconButton, DefaultTheme, Chip, Title, DataTable } from 'react-native-paper';

import heurekaData from '../data/heureka.json';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ececec',
        flex: 1,
        // flexDirection: 'row'
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 50,
    },
    container3: {
        // paddingTop: 50,
    },
    container4: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    container5: {
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
        zIndex: 10,
    },
});

const productGroups = _uniq(heurekaData.map((hd) => hd.group));

export default function ShopScreen() {
    const [text, setText] = useState(null);
    const [hidden, setHidden] = useState(true);
    const [items, setItems] = useState([]);
    const [products, setProducts] = useState(productGroups);
    const [searched, setSearched] = useState(false);

    const onTextType = (t) => {
        if (t.length > 2) {
            const filteredProducts = products.filter((prodName) => prodName.startsWith(text));
            setHidden(false);
            setProducts(filteredProducts);
        } else {
            setProducts(productGroups);
            setHidden(true);
        }
        setText(t);
    };

    const addItem = (item) => {
        setItems(_uniq([...items, item]));
        setHidden(true);
    };

    const removeItem = (item) => {
        setItems(items.filter((i) => i !== item));
        setHidden(true);
        if (items.length === 0) {
            setSearched(false);
        }
    };

    const calculateCheapestMerchants = () => {
        const filteredProducts = heurekaData.filter((hd) =>
            items.some((item) => item === hd.group)
        );
        const productByMerchant = _groupBy(filteredProducts, (fp) => fp.merchant);
        const cheapests = Object.keys(productByMerchant)
            .map((merchant) => {
                const prods = productByMerchant[merchant];
                const sum = _sumBy(prods, (p) => p.price);
                return { merchant, sum };
            })
            .sort((a, b) => a.sum - b.sum);
        return cheapests;
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
                            <TouchableOpacity key={i} onPress={() => addItem(item)}>
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )}
                        // renderSeparator={(props) => <Divider />}
                        renderTextInput={(props) => (
                            <TextInput
                                // style={styles.textInput}
                                mode="flat"
                                placeholder="Pridaj produkt do košíka"
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
            <View style={styles.container3}>
                <View style={styles.container5}>
                    <Title>Môj nákupný zoznam</Title>
                    <IconButton
                        icon="magnify"
                        color={DefaultTheme.colors.primary}
                        size={40}
                        animated
                        onPress={() => setSearched(true)}
                    />
                </View>
                <View style={styles.container4}>
                    {items.map((item, i) => (
                        <Chip key={i} mode="outlined" onClose={() => removeItem(item)}>
                            {item}
                        </Chip>
                    ))}
                </View>
            </View>
            <View>
                {searched ? (
                    <>
                        <Title>Najlacnejší nákup</Title>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Obchod</DataTable.Title>
                                <DataTable.Title numeric>Cena</DataTable.Title>
                            </DataTable.Header>
                            {calculateCheapestMerchants()
                                .slice(0, 5)
                                .map((prod, index) => (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell>{prod.merchant}</DataTable.Cell>
                                        <DataTable.Cell numeric>{`${(prod.sum / 100).toFixed(
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
