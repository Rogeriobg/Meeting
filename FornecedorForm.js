import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const FornecedorForm = ({ onAddSupplier }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [category, setCategory] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos da sua permissão para acessar as imagens!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (name && address && contact && category) {
      onAddSupplier({ name, address, contact, category, imageUri });
      setName('');
      setAddress('');
      setContact('');
      setCategory('');
      setImageUri(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Fornecedor</Text>
      <Text style={styles.label}>Nome:</Text>
      <TextInput 
        style={styles.input} 
        value={name} 
        onChangeText={setName} 
      />

      <Text style={styles.label}>Endereço:</Text>
      <TextInput 
        style={styles.input} 
        value={address} 
        onChangeText={setAddress} 
      />

      <Text style={styles.label}>Contato:</Text>
      <TextInput 
        style={styles.input} 
        value={contact} 
        onChangeText={setContact} 
      />

      <Text style={styles.label}>Categoria:</Text>
      <TextInput 
        style={styles.input} 
        value={category} 
        onChangeText={setCategory} 
      />

      <Button 
        title="Selecionar Imagem" 
        onPress={handleImagePick} 
        color="#007bff" 
      />

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <Button 
        title="Adicionar Fornecedor" 
        onPress={handleSubmit} 
        color="#28a740" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 25,
    textAlign:'center'
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default FornecedorForm;