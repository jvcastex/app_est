// screens/HomeScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground, Dimensions, Image } from "react-native"; // Adicionando a importação do Image
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome'; // Importe o ícone

const { width, height } = Dimensions.get('window');

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
      {/* Fundo gradiente */}
      <ImageBackground source={require('../public/background.png')} style={styles.background} resizeMode="cover">
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require('../public/logo.png')} style={styles.logo} />
          <Text style={styles.companyName}>
            <Text style={styles.tagText}>Tag</Text>
            <Text style={styles.itText}>It</Text>
          </Text>
        </View>

        {/* Exibe o nome do usuário e o tipo */}
        {userData && (
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Olá, {userData.name}!</Text>
            <Text style={styles.userRole}>Tipo: {userData.role}</Text>
          </View>
        )}

        {/* Barra lateral com opções */}
        <View style={styles.sidebar}>
          <TouchableOpacity style={styles.sidebarButton} onPress={() => navigation.navigate("ChangePassword")}>
            <Icon name="lock" size={24} color="#007BFF" style={styles.icon} />
            <Text style={styles.sidebarButtonText}>Alterar Senha</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarButton} onPress={() => navigation.navigate("DeleteAccount")}>
            <Icon name="trash" size={24} color="#DC3545" style={styles.icon} />
            <Text style={styles.sidebarButtonText}>Excluir Conta</Text>
          </TouchableOpacity>
        </View>

        {/* Botões principais */}
        <View style={styles.mainButtons}>
          <TouchableOpacity style={styles.mainButton} onPress={() => navigation.navigate("Stocks")}>
            <Icon name="archive" size={24} color="#28A745" style={styles.icon} />
            <Text style={styles.mainButtonText}>Ver Estoques</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mainButton} onPress={() => navigation.navigate("Store")}>
            <Icon name="shopping-cart" size={24} color="#17A2B8" style={styles.icon} />
            <Text style={styles.mainButtonText}>Loja</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="sign-out" size={24} color="#FFFFFF" style={styles.icon} />
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A", // Cor de fundo escura
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  userInfo: {
    marginBottom: 40,
    alignItems: 'center',
  },
  userName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF", // Branco
  },
  userRole: {
    fontSize: 18,
    color: "#E0E0E0", // Cinza claro
  },
  sidebar: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  sidebarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2C', // Fundo mais escuro
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%',
    maxWidth: 300,
  },
  sidebarButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  mainButtons: {
    marginBottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3C3C3C', // Fundo mais escuro
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%',
    maxWidth: 300,
  },
  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6C757D', // Cinza médio
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '80%',
    maxWidth: 300,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 10,
  },
});
