import React, { useState } from 'react'
import { Button } from 'react-native'
import { TextInput } from 'react-native'
import { ScrollView } from 'react-native'
import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from '../constants'
import { addPlace } from '../store/places.actions'
import { useDispatch } from "react-redux"
import ImageSelector from '../components/imageSelector'
import LocationSelector from '../components/LocationSelector'

const NewPlaceScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [image, setImage] = useState()
    const [location, setLocation] = useState()

    const handleTitleChange = text => setTitle(text)
    const handleSave = () => {
        dispatch(addPlace(title, image, location))
        navigation.navigate("Direcciones")
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.label}>Titulo</Text>
                <TextInput style={styles.input} value={title} onChangeText={handleTitleChange} />
                <ImageSelector onImage={setImage} />
                <LocationSelector onLocation={setLocation} />
                <Button 
                title='Guardar direccion' 
                color={COLORS.MAROON} 
                onPress={handleSave} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 16,
    },
    input: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 2,
        paddingVertical: 4,
    },
})

export default NewPlaceScreen
