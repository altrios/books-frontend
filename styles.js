// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F7F7F7', 
  },
  card: {
    elevation: 3,
    marginVertical: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  bookImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  bookDetails: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  paragraph: {
    fontSize: 14,
    color: '#666666', 
    marginTop: 4,
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginVertical: 8,
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    color: '#333333',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
    marginVertical: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    elevation: 3,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    width: '80%',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
