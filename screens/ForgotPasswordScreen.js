// screens/ForgotPasswordScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";  // Importando corretamente a função e a autenticação

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");

  // Função para lidar com o envio do link de redefinição de senha
  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira o e-mail.");
      return;
    }

    const auth = getAuth();  // Obtendo a instância de autenticação

    try {
      // Envia o email de redefinição de senha usando o Firebase Authentication
      await sendPasswordResetEmail(auth, email);

      // Exibe uma mensagem de sucesso
      Alert.alert("Sucesso", "Email de recuperação enviado! Verifique sua caixa de entrada.");

      // Redireciona para a tela de login após o envio do email
      navigation.navigate("Login");
    } catch (error) {
      // Exibe uma mensagem de erro caso ocorra algum problema
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>

      {/* Campo de entrada para o email */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      {/* Botão para enviar o link de redefinição de senha */}
      <Button title="Enviar Link" onPress={handleResetPassword} color="#DC3545" />
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
