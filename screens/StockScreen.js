// screens/StockScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, Image } from "react-native";
import { db, auth } from "../firebaseConfig"; // Importa autenticação
import { collection, getDocs, addDoc, doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Importe o ícone

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
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../public/logo.png')} style={styles.logo} />
        <Text style={styles.companyName}>
          <Text style={styles.tagText}>Tag</Text>
          <Text style={styles.itText}>It</Text>
        </Text>
      </View>

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
          <TouchableOpacity style={styles.addButton} onPress={handleAddStock}>
            <Icon name="plus" size={24} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.buttonText}>Adicionar Estoque</Text>
          </TouchableOpacity>
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
            <Icon name="cube" size={24} color="#39FF14" style={styles.stockIcon} />
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
    backgroundColor: "#1A1A1A", // Cor de fundo escura
    justifyContent: "flex-start",
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  companyName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF", // Branco
    textShadowColor: '#000000', // Sombra para destacar
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  tagText: {
    color: '#39FF14', // Verde neon
  },
  itText: {
    color: '#FFFFFF', // Branco
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#FFFFFF", // Branco
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0", // Borda suave
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#FAFAFA", // Fundo levemente acinzentado
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#007BFF", // Azul moderno
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  list: {
    flexGrow: 1,
    gap: 10,
  },
  stockItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2C", // Fundo mais escuro
    padding: 15,
    borderRadius: 8,
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
    color: "#FFFFFF", // Branco
  },
});
