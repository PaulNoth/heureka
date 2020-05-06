import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, IconButton, DefaultTheme } from 'react-native-paper';

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
});

export default function ShopScreen() {
    const [text, setText] = useState(null);
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <TextInput
                    style={styles.textInput}
                    mode="flat"
                    placeholder="Hľadaj najlacnejší produkt"
                    value={text}
                    onChangeText={(t) => setText(t)}
                />
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
