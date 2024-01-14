import React, { useState } from 'react';
import { View, Text, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph, Button as PaperButton } from 'react-native-paper';
import Modal from 'react-native-modal';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

import styles from '../styles';

const PantallaCreacion = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('https://preview.free3d.com/img/2016/08/1871866767865808230/98tdvmqs.jpg');
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

    const handleGuardar = async () => {
        try {
            const formData = new FormData();

            // Add the file to FormData if an image is selected
            if (imagen) {
                formData.append('ImgUrl',imagen);
            }

            formData.append('Descripcion', descripcion);
            formData.append('Name', nombre);
            

            const response = await axios.post('http://10.0.2.2:3000/books', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setModalVisible(true);
            } else {
                Alert.alert('Error', `Error al crear el libro: ${response.data.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', `Error al crear el libro: ${error.message}`);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        navigation.navigate('Inicio'); // Replace 'Inicio' with the name of your home screen
    };


    return (
        <View style={styles.container}>
            <Card elevation={4}>
                <Card.Content>
                    <Text style={styles.title}>Crear Nuevo Libro</Text>
                </Card.Content>
                <Card.Content>
                    {imagen && (
                        <View style={styles.bookImage}>
                            <Image
                                source={{ uri: imagen }}
                                style={{ width: '100%', height: '100%' }}
                                onError={(e) => console.error('Error loading image:', e.nativeEvent.error)}
                            />
                        </View>
                    ) }
                </Card.Content>
                {/* <Card.Content>
                    {imagen && (
                        <Image
                            source={{ uri: imagen }}
                            style={{ width: '20%', height: '30%' }}
                        />
                    )}
                </Card.Content> */}

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
                    <PaperButton onPress={handleGuardar}>Guardar Libro</PaperButton>
                </Card.Actions>
            </Card>
            <Modal isVisible={isModalVisible} style={styles.modalContainer}>
                <Card style={styles.modalCard}>
                    <Text style={styles.modalText}>Libro creado con éxito</Text>
                    <Card.Actions>
                        <PaperButton onPress={closeModal}>OK</PaperButton>
                    </Card.Actions>
                </Card>
            </Modal>
        </View>
    );
};

export default PantallaCreacion;
