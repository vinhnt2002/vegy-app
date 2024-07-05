import { appwriteConfig, databases } from "../appwrite";
import { Query } from "react-native-appwrite";
export async function getAllFarm() {
  try {
    const farms = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.farmCollectionId
    );

    return farms.documents;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getFarmByID(farmId: string) {
  try {
    const farm = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.farmCollectionId,
      farmId
    );

    const slots = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.slotCollectionId,
      [Query.equal("farmId", farmId)]
    );

    return {
      ...farm,
      slots: slots.documents,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
