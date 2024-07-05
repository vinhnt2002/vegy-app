import { appwriteConfig, databases } from "../appwrite";
import { Query } from "react-native-appwrite";

export async function getSlotByFarmId(farmId: string) {
  try {
    const slots = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.slotCollectionId,
      [Query.equal("farmId", farmId)]
    );

    return slots.documents;
  } catch (error: any) {
    throw new Error(error);
  }
}
