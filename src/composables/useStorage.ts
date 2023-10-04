import { ref } from "vue";
import getUser from "./getUser";
import { firebaseStorage, storage } from "@/firebase/config";

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
    const storageRef = firebaseStorage.ref(storage, filePath.value);

    try {
      const res = await firebaseStorage.uploadBytes(storageRef, file);
      console.log(res);
      url.value = await firebaseStorage.getDownloadURL(storageRef);
    } catch (err: any) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  return { url, filePath, error, uploadImage };
};

export default useStorage;
