// PantallaPrincipal.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Card, Button as PaperButton } from 'react-native-paper';
import { Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import styles from '../styles';

const PantallaPrincipal = () => {
    const [books, setBooks] = useState([]);
    const navigation = useNavigation();

    const fetchData = () => {
        console.log('Before API call');
        axios
            .get('http://10.0.2.2:3000/books')
            .then((response) => {
                setBooks(response.data);
            })
            .catch((error) => console.error('API call error:', error));
    };

    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => {
            fetchData();
        });

        // Cleanup function
        return () => {
            if (focusListener) {
                focusListener();
            }
        };
    }, [navigation]);

    const navigateToDetalle = (libroId) => {
        navigation.navigate('Detalle', { libroId });
    };

    const navigateToCreacion = () => {
        navigation.navigate('Crear');
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={books}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigateToDetalle(item.id)}>
                        <Card style={styles.card}>
                            <Card.Content style={styles.cardContent}>
                                <View style={styles.bookImage}>
                                    <Image
                                        source={{ uri: item.ImgUrl }}
                                        style={{ width: '100%', height: '100%' }}
                                        onError={(e) => console.error('Error loading image:', e.nativeEvent.error)}
                                    />
                                </View>
                                <View style={styles.bookDetails}>
                                    <Title style={styles.title}>{item.Name}</Title>
                                    <Paragraph style={styles.paragraph}>{item.description}</Paragraph>
                                </View>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                )}
            />
            <Card.Actions>

                <PaperButton style={styles.floatingButton} onPress={navigateToCreacion}>
                    Nuevo Libro
                </PaperButton>
            </Card.Actions>
        </View>
    );
};

export default PantallaPrincipal;
