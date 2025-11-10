import CommonHeader from "@/components/CommonHeader";
import AppColors from "@/constants/Colors";
import { getProduct } from "@/lib/api";
import { Product } from "@/types";
import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SingleProductScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const idNum = Number(id);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const data = await getProduct(idNum);
        setProduct(data);
      } catch (error) {
        setError("Failed to fetch product data");
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProductData();
  }, [id]);

  if (loading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={AppColors.primary} />
      </View>
    );

  if (error)
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );

  if (!product) return null;

  return (
    <View style={styles.container}>
      <CommonHeader />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{product.title}</Text>

          <View style={styles.ratingRow}>
            <AntDesign name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>
              {product.rating?.rate} ({product.rating?.count} reviews)
            </Text>
          </View>

          <Text style={styles.price}>${product.price.toFixed(2)}</Text>

          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.quantityRow}>
          <TouchableOpacity
            onPress={() => setQuantity((q) => Math.max(1, q - 1))}
            style={styles.qtyButton}
          >
            <AntDesign name="minus" size={18} color="black" />
          </TouchableOpacity>

          <Text style={styles.qtyText}>{quantity}</Text>

          <TouchableOpacity
            onPress={() => setQuantity((q) => q + 1)}
            style={styles.qtyButton}
          >
            <AntDesign name="plus" size={18} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SingleProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background.primary,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.background.primary,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  imageContainer: {
    width: "100%",
    height: 300,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "80%",
  },
  infoContainer: {
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 8,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  ratingText: {
    marginLeft: 4,
    color: "#666",
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
    color: AppColors.primary,
    marginTop: 10,
  },
  description: {
    marginTop: 10,
    color: "#444",
    lineHeight: 20,
  },
  quantityRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  qtyButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  qtyText: {
    fontSize: 18,
    marginHorizontal: 20,
    fontWeight: "600",
  },
  addToCartButton: {
    backgroundColor: AppColors.primary,
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
