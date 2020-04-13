import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Badge } from 'react-native-paper';

export default function Counter() {
    const [count, setCount] = useState(0);
    return (
        <View style={styles.container}>
            <Badge>{count}</Badge>
            <Button mode="contained" onPress={() => setCount(count + 1)}>
                Increment counter
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});