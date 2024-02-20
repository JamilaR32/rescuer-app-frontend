import * as SecureStore from "expo-secure-store";
const getToken = async () => {
  const token = await SecureStore.getItemAsync("token");
};

const deleteToken = async () => {
  SecureStore.deleteItemAsync("token");
};

const saveToken = async (token) => {
  await SecureStore.setItemAsync("token", token);
};

export { getToken, deleteToken, saveToken };
