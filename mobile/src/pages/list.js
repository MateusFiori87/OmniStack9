import React, { useState, useEffect } from 'react';
import { View, ScrollView, AsyncStorage, Image, StyleSheet } from 'react-native'

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png'

function List({ navigation }) {
    const [tecnologias, setTecnologias] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('tecnologias').then(storageTecnologias => {
            const tecnologiasArray = storageTecnologias.split(',').map(tec => tec.trim());

            setTecnologias(tecnologiasArray)
        });
    }, [])

    return (
        <View>
            <Image style={styles.logo} source={logo} />

            <ScrollView>
                {tecnologias.map(tech => <SpotList key={tech} tecnologias={tech} />)}
            </ScrollView>
        </View>
    )
}

export default List

const styles = StyleSheet.create({

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 10
    }
})