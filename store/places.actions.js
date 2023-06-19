import * as FileSystem from 'expo-file-system'
import { fetchAddress, insertAddress } from '../db'

export const ADD_PLACE = 'ADD_PLACE'
export const LOAD_PLACES = 'LOAD_PLACES'

export const addPlace = (title, image, location) => {
    return async dispatch =>{
        const fileName = image.split('/').pop()
        const Path = FileSystem.documentDirectory + fileName

        try {
            FileSystem.moveAsync({
                from: image,
                to: Path
            })
            const result = await insertAddress(
                title, image, location.lat, location.lng
            )
            console.log(result)
        } catch (error) {
            console.log(error.message)
        }
        dispatch({type: ADD_PLACE, payload: {title, image: Path, lat: location.lat, lng: location.lng}})
    }
}

export const loadAddres = () => {
    return async (dispatch) => {
        try {
            const result = await fetchAddress()
            console.log(result)
            dispatch({type: LOAD_PLACES, places: result.rows._array })
        } catch (error) {
            throw error;
        }
    }
}