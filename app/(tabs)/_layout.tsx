import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
          tabBarIcon: ({ color }) => (
            <Feather name="shopping-cart" color={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Feather name="user" color={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen name="search" options={{ href: null }} />
      <Tabs.Screen name="favorites" options={{ href: null }} />
      <Tabs.Screen name="cart" options={{ href: null }} />
      <Tabs.Screen
        name="product/[id]"
        options={{ href: null, tabBarStyle: { display: "none" } }}
      />
    </Tabs>
  );
};

export default TabsLayout;
