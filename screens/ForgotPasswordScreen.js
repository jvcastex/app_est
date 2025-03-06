// screens/ForgotPasswordScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
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
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../public/logo.png')} style={styles.logo} />
        <Text style={styles.companyName}>
          <Text style={styles.tagText}>Tag</Text>
          <Text style={styles.itText}>It</Text>
        </Text>
      </View>

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
      <TouchableOpacity style={styles.primaryButton} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Enviar Link</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  primaryButton: {
    backgroundColor: "#DC3545", // Vermelho discreto
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
