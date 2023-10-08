import { ref } from "vue";
import getUser from "./getUser";
import { storage } from "@/firebase/config";
import {
  uploadBytes,
  getDownloadURL,
  ref as firebaseRef,
} from "firebase/storage";

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref("");
  const filePath = ref<string | null>(null);

  const uploadImage = async (file: File) => {
    if (!user.value) {
      console.log("No user is logged in");
      return;
    }
    filePath.value = `covers/${user.value.uid}/${file.name}`;
    const storageRef = firebaseRef(storage, filePath.value);

    try {
      const res = await uploadBytes(storageRef, file);
      url.value = await getDownloadURL(storageRef);
      return res;
    } catch (err: any) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  return { url, filePath, error, uploadImage };
};

export default useStorage;
