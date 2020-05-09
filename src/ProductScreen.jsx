import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { TextInput, IconButton, DefaultTheme, Divider } from 'react-native-paper';

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

const testData = ['mineralka', 'jogurt', 'mlieko'];

export default function ShopScreen() {
    const [text, setText] = useState(null);
    const [hidden, setHidden] = useState(true);

    const onTextType = (t) => {
        if(t.length > 2) {
            setHidden(false);
        } else {
            setHidden(true);
        }
        setText(t);
    }

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <View style={{ flex: 1 }}>
                    <Autocomplete
                        hideResults={hidden}
                        data={testData}
                        containerStyle={styles.autocompleteContainer}
                        renderItem={({ item, i }) => (
                            <TouchableOpacity key={i} onPress={() => console.log({ query: item })}>
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
        </View>
    );
}
