import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native'
import React from 'react'
import * as ImagePicker from "expo-image-picker"
import { useState } from 'react'

import COLORS from "../constants/Colors"

const ImageSelector = (props) => {

  const [pickerUri, setPickerUri] = useState();

  const verifyPermissons = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permisos son insuficientes",
        "Necesitamos el permiso de la camara para esta funcion",
        [{ text: "Ok"}]
      )
      return false;
    }
    return true;
  }
  const handleTakeImage = async () => {
    const hasPermission = await verifyPermissons()
    if (!hasPermission) return
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    })
    setPickerUri(image.assets[0].uri)
    props.onImage(image.assets[0].uri)
  }

  return (
    <View style={styles.container}>
      <View style={styles.previw}>
        {!pickerUri ? (
          <Text>No hay imagen seleccionada.</Text>
        ) : (
          <Image source={{uri: pickerUri}} style={styles.image} />
        )}
      </View>
      <Button title="Tomar foto" onPress={handleTakeImage} />
    </View>
  )
}

export default ImageSelector

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  previw: {
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
})