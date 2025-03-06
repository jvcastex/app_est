// screens/DeleteAccountScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { auth } from "../firebaseConfig";
import { EmailAuthProvider, reauthenticateWithCredential, deleteUser } from "firebase/auth"; // Importações necessárias

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
      <Button title="Excluir Conta" onPress={handleDeleteAccount} color="#DC3545" />
    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
});