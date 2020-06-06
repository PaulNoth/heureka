import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';  // eslint-disable-line
import { Snackbar, Portal } from 'react-native-paper';  // eslint-disable-line

import gps from '../data/gps.json';

const styles = StyleSheet.create({
    distanceText: {
        fontSize: 9,
        paddingBottom: 0,
        marginBottom: 0,
    },
});

const myPos = {
    lat: 48.1537104,
    lon: 17.0859003,
};

export default function DisplayDistance({ merchant }) { // eslint-disable-line
    const [position, setPosition] = useState({ lat: 0, lon: 0 });
    const [errorMsg, setErrorMsg] = useState(null); // eslint-disable-line

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }

            try {
                const location = await Location.getCurrentPositionAsync();

                setPosition({ lat: location.latitude, lon: location.longitude });
            } catch (e) {
                setErrorMsg('Problem so ziskanim GPS polohy');
                setPosition(myPos);
            }
        })();
    });

    const degreesToRadians = (degrees) => {
        return (degrees * Math.PI) / 180;
    };

    const distanceInKmBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
        const earthRadiusKm = 6371;

        const dLat = degreesToRadians(lat2 - lat1);
        const dLon = degreesToRadians(lon2 - lon1);

        const lat1Rad = degreesToRadians(lat1);
        const lat2Rad = degreesToRadians(lat2);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return earthRadiusKm * c;
    };

    return (
        // <>
        <Text style={styles.distanceText}>{`${distanceInKmBetweenEarthCoordinates(
            position.lat,
            position.lon,
            gps[merchant].lat,
            gps[merchant].lon
        ).toFixed(2)} km`}</Text>
        // <Snackbar visible="true">{errorMsg}</Snackbar>
        // </>
    );
}
