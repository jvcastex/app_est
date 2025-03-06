// App.js
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { auth } from "./firebaseConfig";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Verifica se o usuário está logado ao iniciar o app
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Usuário autenticado
        setUser(authUser);
      } else {
        // Usuário não autenticado
        setUser(null);
      }
      setIsLoading(false);
    });

    // Limpa o listener quando o componente é desmontado
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    // Exibe um indicador de carregamento enquanto verifica o estado de autenticação
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <AppNavigator />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});