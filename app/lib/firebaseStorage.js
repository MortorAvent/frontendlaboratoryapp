import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "@/app/lib/firebase"; // Upewnij się, że importujesz poprawną konfigurację Firebase

const storage = getStorage(app);

export const uploadProfileImage = async (file, userId) => {
  if (!file) return null;

  try {
    // Tworzenie referencji do pliku w Firebase Storage
    const storageRef = ref(storage, `profilePictures/${userId}/${file.name}`);

    // Przesyłanie pliku do Firebase Storage
    await uploadBytes(storageRef, file);

    // Pobieranie publicznego URL zdjęcia
    const photoURL = await getDownloadURL(storageRef);

    return photoURL;
  } catch (error) {
    console.error("Błąd podczas przesyłania zdjęcia:", error);
    throw error;
  }
};
