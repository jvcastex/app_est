import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  Alert, 
  TouchableOpacity 
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function StockSelect() {
  const route = useRoute();
  const navigation = useNavigation();
  const { stockId } = route.params;
  const [products, setProducts] = useState([]);

  // Função para carregar os produtos do Firestore
  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, "products");
      const q = query(productsCollection, where("stockId", "==", stockId));
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    } catch (error) {
      Alert.alert("Erro ao buscar produtos", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [stockId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos do Estoque</Text>

      {/* Botões para Adicionar e Remover Produtos */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddProduct", { stockId })}
        >
          <Text style={styles.buttonText}>Adicionar Produto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.removeButton]}
          onPress={() => navigation.navigate("RemoveProduct", { stockId })}
        >
          <Text style={styles.buttonText}>Remover Produto</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Produtos */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productQuantity}>Quantidade: {item.quantity}</Text>
          </View>
        )}
      />
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#28A745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  removeButton: {
    backgroundColor: "#DC3545",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  productItem: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productQuantity: {
    fontSize: 16,
    color: "#666",
  },
});