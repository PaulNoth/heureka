import _uniq from 'lodash/uniq';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { TextInput, IconButton, DefaultTheme, Chip, Title } from 'react-native-paper';

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

const testData = ['mineralka', 'jogurt', 'mlieko'];

export default function ShopScreen() {
    const [text, setText] = useState(null);
    const [hidden, setHidden] = useState(true);
    const [items, setItems] = useState([]);

    const onTextType = (t) => {
        if (t.length > 2) {
            setHidden(false);
        } else {
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
    };

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <View style={{ flex: 1 }}>
                    <Autocomplete
                        hideResults={hidden}
                        data={testData}
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
                        onPress={() => console.log('Pressed')}
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
        </View>
    );
}
