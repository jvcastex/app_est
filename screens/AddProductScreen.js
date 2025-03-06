// screens/AddProductScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";

export default function AddProductScreen({ navigation }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");

  // Função para selecionar uma imagem da galeria
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Por favor, conceda permissão para acessar a galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri); // Salva o URI da imagem selecionada
    }
  };

  // Função para adicionar um novo produto ao Firestore
  const handleAddProduct = async () => {
    try {
      if (!name || !quantity || !location || !arrivalDate || !description) {
        Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
        return;
      }

      const productData = {
        name,
        quantity: parseInt(quantity, 10),
        location,
        arrivalDate,
        photo,
        description,
      };

      // Adiciona o produto à coleção "products" no Firestore
      await addDoc(collection(db, "products"), productData);

      // Exibe uma mensagem de sucesso
      Alert.alert("Sucesso", "Produto adicionado com sucesso!");

      // Limpa os campos após o cadastro
      setName("");
      setQuantity("");
      setLocation("");
      setArrivalDate("");
      setPhoto(null);
      setDescription("");

      // Redireciona para a tela de estoques
      navigation.navigate("Stocks");
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Produto</Text>

      {/* Campo de entrada para o nome */}
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      {/* Campo de entrada para a quantidade */}
      <TextInput
        placeholder="Quantidade"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />

      {/* Campo de entrada para a localização */}
      <TextInput
        placeholder="Localização (Setor)"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />

      {/* Campo de entrada para a data de chegada */}
      <TextInput
        placeholder="Data de Chegada (AAAA-MM-DD)"
        value={arrivalDate}
        onChangeText={setArrivalDate}
        style={styles.input}
      />

      {/* Seleção de foto */}
      <TouchableOpacity onPress={pickImage} style={styles.photoButton}>
        <Text style={styles.photoButtonText}>
          {photo ? "Foto Selecionada" : "Selecionar Foto"}
        </Text>
      </TouchableOpacity>

      {/* Campo de entrada para a descrição */}
      <TextInput
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        style={styles.input}
      />

      {/* Botão para adicionar o produto */}
      <Button title="Adicionar Produto" onPress={handleAddProduct} color="#28A745" />
    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  photoButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  photoButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});