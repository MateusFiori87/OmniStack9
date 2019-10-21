import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, KeyboardAvoidingView, AsyncStorage } from 'react-native'

import api from '../services/api'
import logo from '../assets/logo.png'
import { TouchableOpacity } from 'react-native-gesture-handler';

function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [tecnologias, setTecnologias] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('usuario').then(usuario => {
            if (usuario) {
                //navigation.navigate('List');
            }
        });
    }, [])

    async function handleSubmit() {
        const response = await api.post('/sessions', {
            email
        })

        const { _id } = response.data;

        await AsyncStorage.setItem('usuario', _id);
        await AsyncStorage.setItem('tecnologias', tecnologias);

        navigation.navigate('List');
    }

    return (
        <KeyboardAvoidingView enabled={true} behavior="padding" style={styles.container}>
            <Image source={logo} />

            <View style={styles.form}>
                <Text style={styles.label}> SEU E-MAIL * </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}> TECNOLOGIAS * </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={tecnologias}
                    onChangeText={setTecnologias}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Econtrar spots</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },

    input: {
        borderWidth: 1,
        borderColor: "#DDD",
        paddingHorizontal: 20,
        fontSize: 16,
        color: "#444",
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
})