import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

import api from '../services/api'

function SpotList({ tecnologias, navigation }) {
    const [spots, setSpots] = useState([]);


    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: { tech: tecnologias }
            })

            setSpots(response.data);
        }

        loadSpots();
    }, [])

    function handleNavigate(id) {
        navigation.navigate('Book', { id });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tecnologias}</Text></Text>

            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View styel={styles.listItem}>
                        <Image style={styles.imagem} source={{ uri: item.imagem_url }} />
                        <Text style={styles.empresa}>{item.empresa}</Text>
                        <Text style={styles.preco}>{item.preco ? `R$ ${item.preco}/dia` : `Gratuito`} </Text>
                        <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginBottom: 30
    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15
    },

    bold: {
        fontWeight: 'bold'
    },

    list: {
        paddingHorizontal: 10,
    },

    listItem: {
        marginRight: 30,
    },

    imagem: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2
    },

    empresa: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10
    },

    preco: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
    },

    button: {
        height: 32,
        width: 180,
        backgroundColor: '#F05A5B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15
    },
})

export default withNavigation(SpotList);