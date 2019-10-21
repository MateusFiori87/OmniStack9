import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, Text, StyleSheet } from 'react-native'

function List() {
    const [tecnologias, setTecnologias] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('tecnologias').then(storageTecnologias => {
            const tecnologiasArray = storageTecnologias.split(',').map(tec => tec.trim());

            setTecnologias(tecnologiasArray)
        });
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {tecnologias}
            </Text>
        </View>
    )
}

export default List

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        fontSize: 150
    }
})