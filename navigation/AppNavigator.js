// AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import DeleteAccountScreen from "../screens/DeleteAccountScreen";
import StockScreen from "../screens/StockScreen";
import StockSelect from "../screens/StockSelect";
import ProductScreen from "../screens/ProductScreen";
import AddProductScreen from "../screens/AddProductScreen";
import RemoveProductScreen from "../screens/RemoveProductScreen";
import StoreScreen from "../screens/StoreScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: "#1A1A1A" }, // Fundo escuro
          headerTintColor: "#FFFFFF", // Texto branco
          headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
          headerBackTitleVisible: false, // Oculta o título de volta
        }}
      >
        {/* Tela de Login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />

        {/* Tela de Cadastro */}
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Cadastro" }}
        />

        {/* Tela de Recuperação de Senha */}
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ title: "Recuperar Senha" }}
        />

        {/* Tela Inicial */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Início" }}
        />

        {/* Tela de Alteração de Senha */}
        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{ title: "Alterar Senha" }}
        />

        {/* Tela de Exclusão de Conta */}
        <Stack.Screen
          name="DeleteAccount"
          component={DeleteAccountScreen}
          options={{ title: "Excluir Conta" }}
        />

        {/* Tela de Estoques */}
        <Stack.Screen
          name="Stocks"
          component={StockScreen}
          options={{ title: "Estoques" }}
        />

        {/* Tela de Seleção de Estoque */}
        <Stack.Screen
          name="StockSelect"
          component={StockSelect}
          options={{ title: "Produtos do Estoque" }}
        />

        {/* Tela de Detalhes do Produto */}
        <Stack.Screen
          name="ProductDetails"
          component={ProductScreen}
          options={({ route }) => ({
            title: route.params?.productId ? "Produto" : "Detalhes",
          })}
        />

        {/* Tela de Adição de Produto */}
        <Stack.Screen
          name="AddProduct"
          component={AddProductScreen}
          options={{ title: "Adicionar Produto" }}
        />

        {/* Tela de Retirada de Produto */}
        <Stack.Screen
          name="RemoveProduct"
          component={RemoveProductScreen}
          options={{ title: "Retirada de Produto" }}
        />

        {/* Tela da Loja */}
        <Stack.Screen
          name="Store"
          component={StoreScreen}
          options={{ title: "Loja" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
