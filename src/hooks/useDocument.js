import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";

function useDocument(collectionName, documentId) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, collectionName, documentId), (doc) => {
      setData({ id: doc.id, ...doc.data() });
    });
    return () => unsub();
  }, [documentId]);
  return { data };
}

export default useDocument;
