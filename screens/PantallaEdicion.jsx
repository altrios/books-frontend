import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Button as PaperButton } from 'react-native-paper';
import Modal from 'react-native-modal';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

import styles from '../styles';

const PantallaEdicion = ({ route }) => {
    const { libro } = route.params;
    const [nombre, setNombre] = useState(libro.Name || '');
    const [descripcion, setDescripcion] = useState(libro.Descripcion || '');
    const [imagen, setImagen] = useState(libro.ImgUrl);
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
 


    const handleGuardar = async () => {
        try {
            const formData = new FormData();

            // Obtener la extensión del archivo
            const extension = imagen.split('.').pop();

            // Agregar el archivo al FormData
            console.log(imagen)
            formData.append('ImgUrl', imagen);

            formData.append('Descripcion', descripcion);
            formData.append('Name', nombre);
            console.log('formData', formData);

            const response = await axios.put(`http://10.0.2.2:3000/books/${libro.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                const data = response.data;
                setModalVisible(true);


            } else {
                Alert.alert('Error', `Error al actualizar el libro: ${response.data.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', `Error al actualizar el libro: ${error.message}`);
        }
    };



    const closeModal = () => {
        // Close the modal
        setModalVisible(false);

        // Navigate to the home screen
        navigation.navigate('Inicio'); // Replace 'Home' with the name of your home screen
    };


    return (
        <View style={styles.container}>
            <Card elevation={4}>
                <Card.Content>
                    <Text style={styles.title}>Cambiar Imagen del libro</Text>
                </Card.Content>
                <Card.Content>
                    {imagen && (
                        <Image
                            source={{ uri: imagen }}
                            style={{ width: '20%', height: '30%' }}
                        />
                    )}
                </Card.Content>

                <TextInput
                    style={styles.input}
                    placeholder="Imagen Url"
                    value={imagen}
                    onChangeText={setImagen}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={nombre}
                    onChangeText={setNombre}
                />
                <TextInput
                    style={[styles.input, styles.multilineInput]}
                    placeholder="Descripción"
                    value={descripcion}
                    onChangeText={setDescripcion}
                    multiline
                />
                <Card.Actions>
                    <PaperButton onPress={handleGuardar}>Guardar Cambios</PaperButton>
                </Card.Actions>
            </Card>
            <Modal isVisible={isModalVisible} style={styles.modalContainer}>
                <Card style={styles.modalCard}>
                        <Text style={styles.modalText}>Libro guardado con éxito</Text>
                        <Card.Actions>
                            <PaperButton
                                onPress={closeModal}
                            >
                                OK
                            </PaperButton>
                        </Card.Actions>
                </Card>
            </Modal>
        </View>
    );
};

export default PantallaEdicion;
