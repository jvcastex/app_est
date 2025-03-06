// screens/ChangePasswordScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { getAuth, EmailAuthProvider } from "firebase/auth";  // Importando corretamente a autenticação

export default function ChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");  // Campo para confirmação da nova senha

  // Função para lidar com a alteração de senha
  const handleChangePassword = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado. Faça login novamente.");
      return;
    }

    // Verificando se as senhas são iguais
    if (newPassword !== confirmPassword) {
      Alert.alert("Erro", "As senhas novas não coincidem.");
      return;
    }

    // Verificando se a nova senha tem comprimento mínimo
    if (newPassword.length < 6) {
      Alert.alert("Erro", "A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      // Reautentica o usuário com a senha atual
      const credentials = EmailAuthProvider.credential(user.email, currentPassword);
      await user.reauthenticateWithCredential(credentials);

      // Atualiza a senha do usuário
      await user.updatePassword(newPassword);

      // Exibe uma mensagem de sucesso
      Alert.alert("Sucesso", "Senha alterada com sucesso!");

      // Redireciona para a tela inicial após a alteração
      navigation.navigate("Home");
    } catch (error) {
      // Exibe uma mensagem de erro caso ocorra algum problema
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alterar Senha</Text>

      {/* Campo de entrada para a senha atual */}
      <TextInput
        placeholder="Senha Atual"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Campo de entrada para a nova senha */}
      <TextInput
        placeholder="Nova Senha"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Campo de entrada para confirmar a nova senha */}
      <TextInput
        placeholder="Confirmar Nova Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Botão para alterar a senha */}
      <Button title="Alterar Senha" onPress={handleChangePassword} color="#007BFF" />
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
