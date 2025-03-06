// screens/StoreScreen.js
import React from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";

export default function StoreScreen({ navigation }) {
  // Lista de produtos disponíveis na loja
  const storeItems = [
    { id: "1", name: "Rolo de Papel", description: "Pacote com 10 rolos de papel." },
    { id: "2", name: "Impressora Térmica", description: "Impressora térmica para etiquetas." },
    { id: "3", name: "Etiquetas Adesivas", description: "Pacote com 500 etiquetas adesivas." },
    { id: "4", name: "Tinta para Impressora", description: "Cartucho de tinta para impressoras." },
  ];

  // Função para navegar para os detalhes do item
  const handleViewDetails = (item) => {
    navigation.navigate("StoreItemDetails", { item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loja</Text>

      {/* Lista de itens da loja */}
      <FlatList
        data={storeItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Button
              title="Ver Detalhes"
              onPress={() => handleViewDetails(item)}
              color="#007BFF"
            />
          </View>
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
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  list: {
    flexGrow: 1,
    gap: 15,
  },
  itemContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 10,
    color: "#555",
  },
});