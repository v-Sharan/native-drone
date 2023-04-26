import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";

const OptionSelect = ({ title, imgUrl, dimesion, onPressHandle }) => {
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F3F4F8",
        padding: 10,
        width: 150,
        borderRadius: 20,
        height: 200,
      }}
      onPress={onPressHandle}
    >
      <Image
        source={imgUrl}
        style={styles.btnImg(dimesion)}
        resizeMode="contain"
      />
      <Text style={{ display: "flex", fontSize: 20 }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default OptionSelect;

const styles = StyleSheet.create({
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
  }),
});
