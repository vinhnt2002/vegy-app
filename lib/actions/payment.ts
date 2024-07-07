import { appwriteConfig, databases } from "../appwrite";
import { ID, Query } from "react-native-appwrite";

// Create Payment
export async function createPayment(
  userId: string,
  amount: number,
  status: string,
  slotId: string,
  method: string
) {
  try {
    // Tạo bản ghi thanh toán mới
    const payment = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.paymentCollectionId,
      ID.unique(),
      {
        userId: userId,
        amount: amount,
        status: status,
        slotId: slotId,
        method: method,
      }
    );

    if (status === "completed") {
      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.slotCollectionId,
        slotId,
        {
          availability: false,
        }
      );
    }

    return payment;
  } catch (error: any) {
    console.error("Error creating payment or updating slot:", error);
    throw new Error(error);
  }
}
