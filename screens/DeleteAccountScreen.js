// screens/DeleteAccountScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { auth } from "../firebaseConfig";
import { EmailAuthProvider, reauthenticateWithCredential, deleteUser } from "firebase/auth"; // Importações necessárias
import Icon from 'react-native-vector-icons/FontAwesome'; // Importe o ícone

export default function DeleteAccountScreen({ navigation }) {
  const [password, setPassword] = useState("");

  // Função para lidar com a exclusão da conta
  const handleDeleteAccount = async () => {
    try {
      const user = auth.currentUser;

      // Verifica se o usuário está autenticado
      if (!user) {
        throw new Error("Você não está autenticado.");
      }

      // Reautentica o usuário com a senha fornecida
      const credentials = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credentials);

      // Exclui a conta do usuário
      await deleteUser(user);

      // Exibe uma mensagem de sucesso
      Alert.alert("Sucesso", "Sua conta foi excluída com sucesso.");

      // Redireciona para a tela de login após a exclusão
      navigation.navigate("Login");
    } catch (error) {
      // Exibe uma mensagem de erro caso ocorra algum problema
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

      <Text style={styles.title}>Excluir Conta</Text>

      {/* Campo de entrada para a senha */}
      <TextInput
        placeholder="Senha Antiga"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Botão para excluir a conta */}
      <TouchableOpacity style={styles.dangerButton} onPress={handleDeleteAccount}>
        <Icon name="trash" size={24} color="#FFFFFF" style={styles.icon} />
        <Text style={styles.buttonText}>Excluir Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#1A1A1A", // Cor de fundo escura
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
  dangerButton: {
    backgroundColor: "#DC3545", // Vermelho discreto
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'center',
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
});
