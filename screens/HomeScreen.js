// screens/HomeScreen.js
import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = React.useState(null);

  // Função para carregar os dados do usuário do Firestore
  const fetchUserData = async () => {
    try {
      const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        Alert.alert("Erro", "Dados do usuário não encontrados.");
      }
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  // Carrega os dados do usuário ao montar o componente
  React.useEffect(() => {
    fetchUserData();
  }, []);

  // Função para deslogar o usuário
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Exibe o nome do usuário e o tipo */}
      {userData && (
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Olá, {userData.name}!</Text>
          <Text style={styles.userRole}>Tipo: {userData.role}</Text>
        </View>
      )}

      {/* Barra lateral com opções */}
      <View style={styles.sidebar}>
        <Button
          title="Alterar Senha"
          onPress={() => navigation.navigate("ChangePassword")}
          color="#007BFF"
        />
        <Button
          title="Excluir Conta"
          onPress={() => navigation.navigate("DeleteAccount")}
          color="#DC3545"
        />
      </View>

      {/* Botões principais */}
      <View style={styles.mainButtons}>
        <Button
          title="Ver Estoques"
          onPress={() => navigation.navigate("Stocks")}
          color="#28A745"
        />
        <Button
          title="Loja"
          onPress={() => navigation.navigate("Store")}
          color="#17A2B8"
        />
      </View>

      {/* Botão de logout */}
      <Button title="Sair" onPress={handleLogout} color="#6C757D" />
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
  userInfo: {
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  userRole: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
  sidebar: {
    marginBottom: 20,
  },
  mainButtons: {
    marginBottom: 20,
  },
});