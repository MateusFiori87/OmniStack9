import React from 'react';
import { SafeAreaView, Text } from 'react-native'

function Book({ navigation }) {
    const id = navigation.getParam('id');

    return (
        <Text>{`ID DO CABRA ${id}`}</Text>
    )
}

export default Book