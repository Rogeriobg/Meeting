import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const FornecedorList = ({ suppliers, setSuppliers }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const pickImage = async (supplierId) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos de permissão para acessar sua galeria!');
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        updateSupplierImage(supplierId, imageUri);
      }
    } catch (error) {
      console.log('Error picking image: ', error);
      Alert.alert('Erro', 'Ocorreu um erro ao acessar a galeria');
    }
  };

  const updateSupplierImage = (supplierId, imageUri) => {
    setSuppliers((prevSuppliers) =>
      prevSuppliers.map((supplier) =>
        supplier.id === supplierId ? { ...supplier, imageUri } : supplier
      )
    );
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Pesquisar por Nome ou Categoria"
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.input}
      />
      {filteredSuppliers.map((item) => (
        <View key={item.id} style={styles.supplierItem}>
          <Text style={styles.text}>Nome: {item.name}</Text>
          <Text style={styles.text}>Categoria: {item.category}</Text>
          {item.imageUri ? (
            <Image source={{ uri: item.imageUri }} style={styles.image} />
          ) : (
            <Button title="Adicionar Imagem" onPress={() => pickImage(item.id)} />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  input: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  supplierItem: {
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 16,
  }
});

export default FornecedorList;