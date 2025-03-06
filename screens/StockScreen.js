import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { db, auth } from "../firebaseConfig"; // Importa autenticação
import { collection, getDocs, addDoc, doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function StockScreen() {
  const [stocks, setStocks] = useState([]);
  const [stockName, setStockName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar se o usuário é admin
  const navigation = useNavigation();

  // Função para buscar o tipo de usuário no Firestore
  const fetchUserRole = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Erro", "Usuário não autenticado.");
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setIsAdmin(userDoc.data().role === "administrador"); // Verifica se o usuário é admin
      }
    } catch (error) {
      Alert.alert("Erro ao buscar permissões", error.message);
    }
  };

  // Função para carregar os estoques do Firestore
  const fetchStocks = async () => {
    try {
      const stocksCollection = collection(db, "stocks");
      const querySnapshot = await getDocs(stocksCollection);
      const stocksData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStocks(stocksData);
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  // Carrega os dados do usuário e os estoques ao montar o componente
  useEffect(() => {
    fetchUserRole();
    fetchStocks();
  }, []);

  // Função para adicionar um novo estoque
  const handleAddStock = async () => {
    if (!isAdmin) {
      Alert.alert("Permissão negada", "Apenas administradores podem criar estoques.");
      return;
    }

    if (!stockName.trim()) {
      Alert.alert("Erro", "O nome do estoque não pode estar vazio.");
      return;
    }

    try {
      const newStockRef = await addDoc(collection(db, "stocks"), {
        name: stockName,
      });

      setStocks([...stocks, { id: newStockRef.id, name: stockName }]);
      setStockName("");
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estoques</Text>

      {/* Campo para adicionar estoques (visível apenas para admins) */}
      {isAdmin && (
        <>
          <TextInput
            placeholder="Nome do Estoque"
            value={stockName}
            onChangeText={setStockName}
            style={styles.input}
          />
          <Button title="Adicionar Estoque" onPress={handleAddStock} color="#007BFF" />
        </>
      )}

      <FlatList
        data={stocks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.stockItem}
            onPress={() => navigation.navigate("StockSelect", { stockId: item.id })}
          >
            <Text style={styles.stockIcon}>📦</Text>
            <Text style={styles.stockName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  list: {
    flexGrow: 1,
    gap: 10,
  },
  stockItem: {
    flexDirection: "row",
    alignItems: "center",
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
  stockIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  stockName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
