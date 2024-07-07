import { appwriteConfig, databases, getCurrentUser } from "../appwrite";
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


export async function getFarmsWithPurchasedSlots() {
  try {
    const currentUser = await getCurrentUser();
    // 1. Lấy tất cả các payment đã hoàn thành của user
    const payments = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.paymentCollectionId,
      [
        Query.equal("userId", currentUser.$id),
        Query.equal("status", "completed")
      ]
    );

    // 2. Lấy tất cả các slotId từ các payment
    const slotIds = payments.documents.map((payment: any) => payment.slotId.$id);
    // console.log("SlotIds:", slotIds);

    // Nếu không có slot nào được thanh toán, trả về mảng rỗng
    if (slotIds.length === 0) {
      return [];
    }

    // 3. Lấy tất cả các slot tương ứng
    const slots = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.slotCollectionId,
      [
        Query.equal("$id", slotIds)
      ]
    );
    // console.log("Slots:", slots);

    // 4. Lấy tất cả các farmId từ các slot
    const farmIds = [...new Set(slots.documents.map((slot: any) => slot.farmId.$id))];
    // console.log("FarmIds:", farmIds);

    // Nếu không có farm nào, trả về mảng rỗng
    if (farmIds.length === 0) {
      return [];
    }

    // 5. Lấy thông tin của tất cả các farm
    const farms = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.farmCollectionId,
      [
        Query.equal("$id", farmIds)
      ]
    );

    return farms.documents;
  } catch (error: any) {
    console.error("Error fetching farms with purchased slots:", error);
    throw new Error(error.message);
  }
}