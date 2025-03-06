// screens/RemoveProductScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function RemoveProductScreen({ route, navigation }) {
  const { productId } = route.params; // ID do produto passado como parâmetro
  const [product, setProduct] = useState(null);
  const [quantityToRemove, setQuantityToRemove] = useState("");

  // Função para carregar os dados do produto do Firestore
  const fetchProduct = async () => {
    try {
      const productDoc = await getDoc(doc(db, "products", productId));
      if (productDoc.exists()) {
        setProduct({ id: productDoc.id, ...productDoc.data() });
      } else {
        Alert.alert("Erro", "Produto não encontrado.");
      }
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  // Carrega os dados do produto ao montar o componente
  React.useEffect(() => {
    fetchProduct();
  }, []);

  // Função para retirar produtos
  const handleRemoveProduct = async () => {
    try {
      if (!quantityToRemove || isNaN(quantityToRemove) || parseInt(quantityToRemove, 10) <= 0) {
        Alert.alert("Erro", "Insira uma quantidade válida para retirada.");
        return;
      }

      const quantityToRemoveInt = parseInt(quantityToRemove, 10);

      if (quantityToRemoveInt > product.quantity) {
        Alert.alert("Erro", "Quantidade de retirada excede a quantidade disponível.");
        return;
      }

      // Atualiza a quantidade no Firestore
      const newQuantity = product.quantity - quantityToRemoveInt;
      await updateDoc(doc(db, "products", productId), { quantity: newQuantity });

      // Exibe uma mensagem de sucesso
      Alert.alert("Sucesso", `Foram retirados ${quantityToRemoveInt} itens.`);

      // Limpa o campo de quantidade
      setQuantityToRemove("");

      // Redireciona para a tela de detalhes do produto
      navigation.navigate("ProductDetails", { productId });
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Retirada de Produto</Text>

      {/* Informações do produto */}
      <View style={styles.infoContainer}>
        <Text style={styles.info}>Produto: {product.name}</Text>
        <Text style={styles.info}>Quantidade Disponível: {product.quantity}</Text>
      </View>

      {/* Campo de entrada para a quantidade a ser retirada */}
      <TextInput
        placeholder="Quantidade a Retirar"
        value={quantityToRemove}
        onChangeText={setQuantityToRemove}
        keyboardType="numeric"
        style={styles.input}
      />

      {/* Botão para confirmar a retirada */}
      <Button title="Retirar Produto" onPress={handleRemoveProduct} color="#DC3545" />
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  infoContainer: {
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});