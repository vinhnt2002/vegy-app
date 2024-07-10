import { appwriteConfig, databases, getCurrentUser } from "../appwrite";
// @ts-ignore
import { Query, ID } from "react-native-appwrite";

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

export async function getPurchasedSlotsByFarmId(farmId: string) {
  try {
    const currentUser = await getCurrentUser();

    const payments = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.paymentCollectionId,
      [
        Query.equal("userId", currentUser.$id),
        Query.equal("status", "completed"),
      ]
    );

    const slotIds = payments.documents
      .filter((payment: any) => payment.slotId && payment.slotId.$id)
      .map((payment: any) => payment.slotId.$id);

    if (slotIds.length === 0) {
      return [];
    }

    const slots = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.slotCollectionId,
      [Query.equal("$id", slotIds), Query.equal("farmId", farmId)]
    );

    const slotsWithPlants = await Promise.all(
      slots.documents.map(async (slot: any) => {
        const plants = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.plantCollectionId,
          [Query.equal("slotId", slot.$id)]
        );

        const plantsWithSeeds = await Promise.all(
          plants.documents.map(async (plant: any) => {
            if (plant.seeds) {
              const seed = await databases.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.seedCollectionId,
                plant.seeds.$id
              );
              return { ...plant, seed };
            }
            return plant;
          })
        );

        return { ...slot, plants: plantsWithSeeds };
      })
    );

    return slotsWithPlants;
  } catch (error: any) {
    console.error("Error fetching purchased slots for farm:", error);
    throw new Error(error.message);
  }
}

export async function addSeedToSlot(slotId: string, seedId: string) {
  try {
    // const currentUser = await getCurrentUser();

    // Tạo một plant mới
    const newPlant = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.plantCollectionId,
      ID.unique(),
      {
        slotId: slotId,
        seeds: seedId,
        plantedDate: new Date().toISOString(),
        currentStage: 0,
        // userId: currentUser.$id
      }
    );

    return newPlant;
  } catch (error: any) {
    console.error("Error adding seed to slot:", error);
    throw new Error(error.message);
  }
}

// =========== Create faster data

// export async function createFarm(
//   name: string,
//   location: string,
//   size: number,
//   description: string,
//   price: number,
//   image: string
// ) {
//   try {
//     const newFarm = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.farmCollectionId,
//       ID.unique(),
//       {
//         name: name,
//         location: location,
//         size: size,
//         description: description,
//         price: price,
//         image: image,
//       }
//     );

//     return newFarm;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// }

// export async function createSlot(
//   slotNumber: string,
//   size: number,
//   availability: boolean,
//   farmId: string
// ) {
//   try {
//     const newSlot = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.slotCollectionId,
//       ID.unique(),
//       {
//         slotNumber: slotNumber,
//         size: size,
//         availability: availability,
//         farmId: farmId,
//       }
//     );
//     return newSlot;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// }

// Example usage
// (async () => {
//   try {
//     // Tạo một trang trại mới
//     const farm = await createFarm("21m2 goods", "Đà Lạt, Việt Nam", 1000.0,"21m2 Goods - đơn vị trồng rau sạch “từ xa” giúp bạn có mảnh vườn đó dễ dàng. Chúng mình trồng cho mỗi nhà 1 vườn rau riêng ở Lâm Đồng, với tiêu chí:\n- KHÔNG sử dụng phân bón hoá học, thuốc trừ sâu cho cây trồng\n- Có camera giám sát 24/24\n- Ship rau tận nhà về TPHCM mỗi tuần\n- Giá rẻ hơn mua ở siêu thị",120000, "https://plus.unsplash.com/premium_photo-1680344513203-dcc609b9be68?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" );
//     console.log("Farm created:", farm);

//      // Tạo 30 slot đất
//      const slots = [];
//      for (let i = 1; i <= 30; i++) {
//        const slotId = `S${i.toString().padStart(3, '0')}`;
//        const area = 20 + Math.floor(Math.random() * 10);
//        const isAvailable = Math.random() < 0.7;
//        const slot = await createSlot(slotId, area, isAvailable, farm.$id);
//        slots.push(slot);
//      }
//      console.log("All slots created:", slots);
//   } catch (error) {
//     console.error("Error creating farm or slots:", error);
//   }
// })();
