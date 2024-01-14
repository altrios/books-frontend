// PantallaDetalle.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Card, Title, Paragraph, Button as PaperButton } from 'react-native-paper';
import Modal from 'react-native-modal';
import axios from 'axios';
import styles from '../styles';

const PantallaDetalle = ({ route, navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { libroId } = route.params;
  const [libro, setLibro] = useState({});

  useEffect(() => {
    axios.get(`http://10.0.2.2:3000/books/${libroId}`)
      .then(response => setLibro(response.data))
      .catch(error => console.error(error));
  }, [libroId]);

  const handleEditar = () => {
    navigation.navigate('Edicion', { libro }); // Pasar libro como parámetro
  };

  const closeModal = () => {
    // Close the modal
    setModalVisible(false);

    // Navigate to the home screen
    navigation.navigate('Inicio'); // Replace 'Home' with the name of your home screen
  };

  const handleEliminar = () => {
    axios.delete(`http://10.0.2.2:3000/books/${libroId}`)
      .then(() => {
        setModalVisible(true);
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={{ flex: 1, padding: 16, ...styles.container }}>
      <Card elevation={4}>
        <Card.Content>
          <Title>{libro.Name}</Title>
          <Paragraph>{libro.Descripcion}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <PaperButton onPress={handleEditar}>Editar</PaperButton>
          <PaperButton onPress={handleEliminar}>Eliminar</PaperButton>
        </Card.Actions>
      </Card>
      <Modal isVisible={isModalVisible} style={styles.modalContainer}>
        <Card style={styles.modalCard}>
          <Text style={styles.modalText}>Libro Eliminado con éxito</Text>
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


export default PantallaDetalle;
