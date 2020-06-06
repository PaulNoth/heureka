import React from 'react';
import { Provider as PaperProvider, Appbar } from 'react-native-paper';

import ShopScreen from './ShopScreen';

const App = () => (
    <PaperProvider>
        <Appbar.Header>
            <Appbar.Content title="Heureka" subtitle="Pre potraviny" />
        </Appbar.Header>
        <ShopScreen />
    </PaperProvider>
);

export default App;
