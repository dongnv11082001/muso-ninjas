import { db } from "@/firebase/config";
import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { ref, watchEffect } from "vue";

const getCollection = (path: string) => {
  const documents = ref();
  const error = ref<string | null>(null);

  const collectionRef = collection(db, `${path}`);
  const q = query(collectionRef, orderBy("createdAt", "asc"));
  const unsub = onSnapshot(q, (snapshot) => {
    const results: DocumentData[] = [];
    snapshot.forEach((doc) => {
      results.push({ ...doc.data(), id: doc.id });
    });
    documents.value = results;
    error.value = null;
  });

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { documents, error };
};

export default getCollection;
