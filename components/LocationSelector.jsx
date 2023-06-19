import { StyleSheet, Text, View, Alert, Button } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native"
import * as Location from "expo-location"

import COLORS from "../constants/Colors"

const LocationSelector = ({ onLocation }) => {

    const naigation = useNavigation()
    const [pickedLocation, setPickedLocation] = useState()

    const veryPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync()

        if(status !== "granted") {
            Alert.alert(

            )
            return false
        }
        return true
    }
    
    const handleGetLocation = async () => {
        const isLocationOk = await veryPermissions()
        if(!isLocationOk) return

        const location = await Location.getCurrentPositionAsync()
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        })
        onLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        })
    }

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {pickedLocation ? (
            <Text>{pickedLocation.lat}, {pickedLocation.lng}</Text>
        ) : (
            <Text>Esperando ubicacion</Text>
        )}
      </View>
      <Button title='Obtener Ubicacion' onPress={handleGetLocation} />
    </View>
  )
}

export default LocationSelector

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    preview: {
        width: "100%",
        height: 200,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: COLORS.PEACH_PUFF,
        borderWidth: 1,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
})