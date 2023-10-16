import { db } from "@/firebase/config";
import { QueryBy } from "@/types/query";
import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ref, watchEffect } from "vue";

const getCollection = (path: string, queryBy?: QueryBy) => {
  const documents = ref<DocumentData>();
  const error = ref<string | null>(null);

  const collectionRef = collection(db, `${path}`);
  let q = query(collectionRef, orderBy("createdAt", "asc"));

  if (queryBy) {
    q = query(collectionRef, where(...queryBy));
  }

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
