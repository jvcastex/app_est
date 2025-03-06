// screens/RegisterScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Importe a função
import { doc, setDoc } from "firebase/firestore";
import { Picker } from "@react-native-picker/picker"; // Importar o Picker

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("funcionario");

  const handleRegister = async () => {
    try {
      // Use a função createUserWithEmailAndPassword
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
      });

      Alert.alert("Sucesso", "Cadastro realizado!");
      navigation.navigate("Login");
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

      <Text style={styles.title}>Cadastro</Text>

      {/* Campo de entrada para o nome */}
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      {/* Campo de entrada para o email */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      {/* Campo de entrada para a senha */}
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Seletor de função */}
      <Text style={styles.label}>Função:</Text>
      <Picker
        selectedValue={role}
        onValueChange={(itemValue) => setRole(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Funcionário" value="funcionario" />
        <Picker.Item label="Administrador" value="administrador" />
      </Picker>

      {/* Botão de cadastro */}
      <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
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
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "#FFFFFF", // Branco
  },
  picker: {
    borderWidth: 1,
    borderColor: "#E0E0E0", // Borda suave
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#FAFAFA", // Fundo levemente acinzentado
  },
  primaryButton: {
    backgroundColor: "#28A745", // Verde moderno
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
