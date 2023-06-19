import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useSelector, useDispatch } from "react-redux"

import { loadAddres } from '../store/places.actions'
import PlaceItem from '../components/PleaceItem'

const PlaceListScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const places = useSelector(state => state.places.places)

    useEffect(() => {
        dispatch(loadAddres())
    }, [])

    const renderItem = ({ item }) => (
        <PlaceItem 
        title={item.title}
        image={item.image}
        address1={item.lat}
        address2={item.lng}
        onSelect={() => navigation.navigate("Detalle", { placeId: item.id })}
        />
    );

    return (
        <FlatList 
        data={places}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default PlaceListScreen
