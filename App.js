import React from 'react';
import { Provider as PaperProvider, Toolbar, ToolbarContent } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { default as MaterialCommunityIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as FeatherIcon } from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';

export default function App() {
  const [screenIndex, setSceenIndex] = useState(0);

  return (
    <PaperProvider>
      <Toolbar style={{backgroundColor: '#1d8bc9'}}>
        <ToolbarContent
          title={'Heureka'}
        />
        </Toolbar>
      <ToolbarControls screenIndex={screenIndex} scrollTo={this.scrollTo} />
      <Swiper ref='swiper' showsPagination={false} loop={true} bounces={true} onIndexChanged={index => setSceenIndex({ index })} >
        <ProductScreen />
        <ShopScreen />
      </Swiper>
    </PaperProvider>
  );
}

const ToolbarControls = (props) => {
  const iconStyle = { flex: 1, marginTop: 20 };
  const wrapperIconStyle = { flex: 1, alignItems: 'center', justifyContent: 'space-around' };
  const highlightWrapperIconStyle = { ...wrapperIconStyle, borderBottomWidth: 2, borderColor: 'red' }
  const highlightIconColor = "#ffffff";
  const iconColor = "rgba(255, 255, 255, 0.4)";
  const screenIndex = props.screenIndex;
  return (<Toolbar style={{backgroundColor: '#1d8bc9'}}>
    <TouchableOpacity style={screenIndex === 0 ? highlightWrapperIconStyle : wrapperIconStyle} onPressIn={() => props.scrollTo(0)}>
      <View>
        <MaterialCommunityIcon name="cellphone-wireless" size={25} color={screenIndex === 0 ? highlightIconColor : iconColor} style={iconStyle} />
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={screenIndex === 1 ? highlightWrapperIconStyle : wrapperIconStyle} onPressIn={() => props.scrollTo(1)}>
      <View>
        <FeatherIcon name="activity" size={25} color={screenIndex === 1 ? highlightIconColor : iconColor} style={iconStyle} />
      </View>
    </TouchableOpacity>
  </Toolbar>);
};
