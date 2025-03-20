import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';

const PrincipalScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#f8f9fa" barStyle="dark-content" />
            
            <View style={styles.header}>
                <Text style={styles.title}>Sistema de Acceso</Text>
                <Text style={styles.subtitle}>Seleccione una opción</Text>
            </View>
            
            <View style={styles.buttonContainer}>
                {/* Reemplazo Button con TouchableOpacity para mejor control */}
                <TouchableOpacity 
                    style={[styles.button, styles.buttonBlue]}
                    onPress={() => navigation.navigate('Acces')}
                >
                    <Text style={styles.buttonText}>Generar código de acceso</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.button, styles.buttonGreen]}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.buttonText}>Verificar código de acceso</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.footer}>
                <Text style={styles.footerText}>Sistema de Acceso v1.0</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 20,
    },
    header: {
        marginBottom: 50,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#6c757d',
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 300,
    },
    button: {
        marginVertical: 12,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonBlue: {
        backgroundColor: '#3498db',
    },
    buttonGreen: {
        backgroundColor: '#2ecc71',
    },
    footer: {
        position: 'absolute',
        bottom: 20,
    },
    footerText: {
        color: '#adb5bd',
        fontSize: 14,
    }
});

export default PrincipalScreen;