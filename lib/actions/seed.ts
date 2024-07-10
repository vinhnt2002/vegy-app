import { appwriteConfig, databases } from "../appwrite";

// @ts-ignore
import { Query } from "react-native-appwrite";
export async function getAllSeed() {
  try {
    const seeds = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.seedCollectionId
    );

    return seeds.documents;
  } catch (error: any) {
    throw new Error(error);
  }
}
