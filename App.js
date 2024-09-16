import React, { useState } from 'react';
import {   ScrollView, StyleSheet } from 'react-native';
import FornecedorForm from './FornecedorForm';
import FornecedorList from './FornecedorList';

const App = () => {
  const [suppliers, setSuppliers] = useState([]);

  const addSupplier = (supplier) => {
    setSuppliers([...suppliers, { ...supplier, id: Date.now().toString() }]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FornecedorForm onAddSupplier={addSupplier} />
      <FornecedorList suppliers={suppliers} setSuppliers={setSuppliers} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
});

export default App;