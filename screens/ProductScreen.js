import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, StyleSheet, Alert } from "react-native";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function ProductScreen({ route, navigation }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() });
        } else {
          Alert.alert("Erro", "Produto não encontrado.");
          navigation.goBack();
        }
      } catch (error) {
        Alert.alert("Erro", error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      {product.photo ? (
        <Image source={{ uri: product.photo }} style={styles.image} />
      ) : (
        <Text style={styles.noImage}>Sem imagem disponível</Text>
      )}
      <Text style={styles.detail}>Quantidade: {product.quantity}</Text>
      <Text style={styles.detail}>Localização: {product.location}</Text>
      <Text style={styles.detail}>Data de Chegada: {product.arrivalDate}</Text>
      <Text style={styles.detail}>Descrição: {product.description}</Text>

      <Button title="Voltar" onPress={() => navigation.goBack()} color="#007BFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  noImage: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginBottom: 15,
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
    color: "#555",
  },
  loading: {
    fontSize: 18,
    textAlign: "center",
    color: "#888",
  },
});