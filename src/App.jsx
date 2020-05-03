import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import Counter from './Counter';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default function App() {
    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!</Text>
            </View>
            <Counter />
        </PaperProvider>
    );
}