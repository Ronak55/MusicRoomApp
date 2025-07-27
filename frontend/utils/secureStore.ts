import * as SecureStore from 'expo-secure-store';

/**
 * Automatically stringifies objects before saving.
 * Throws if a circular structure is passed.
 */
export const saveToSecureStore = async (key: string, value: unknown) => {
  try {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    await SecureStore.setItemAsync(key, stringValue);
  } catch (error) {
    console.error(`Error saving '${key}' to SecureStore`, error);
  }
};

/**
 * Retrieves value and tries to parse it back to original object.
 * Falls back to returning raw string if not JSON.
 */
export const getFromSecureStore = async (key: string): Promise<any | null> => {
  try {
    const value = await SecureStore.getItemAsync(key);
    if (value === null) return null;

    try {
      return JSON.parse(value); // Attempt to parse as object
    } catch {
      return value; // Return as string if parsing fails
    }
  } catch (error) {
    console.error(`Error retrieving '${key}' from SecureStore`, error);
    return null;
  }
};

export const deleteFromSecureStore = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(`Error deleting '${key}' from SecureStore`, error);
  }
};
