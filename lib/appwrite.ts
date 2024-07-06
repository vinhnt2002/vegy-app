import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.caphile.vegy",
  projectId: "667a3682001b1ee2205a",
  storageId: "667a3b17002c29a0b416",
  databaseId: "667a39e90031b806a0a5",
  userCollectionId: "667a3a0500376f97870d",
  farmCollectionId: "668504bd00148051300b",
  bookingCollectionId: "668508aa003aad7fcad5",
  bookingItemsCollectionId: "66850918000bc5ddd410",
  slotCollectionId: "6685078900288d1b8d4e",
  paymentCollectionId: "66850991001848692504",

  // videoCollectionId: "660d157fcb8675efe308",
};


const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);

// register user
export async function createUser(
  email: string,
  password: string,
  username: string
) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error: any) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error: any) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error: any) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error: any) {
    throw new Error(error);
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
