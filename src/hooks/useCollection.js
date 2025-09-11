import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";
import { where } from "firebase/firestore/lite";

export const useCollection = (collectionName, _query, _where) => {
  const [data, setData] = useState(null);
  const queryData = useRef(_query);
  const whereData = useRef(_where);
  useEffect(() => {
    let q = collection(db, collectionName);
    if (queryData?.current) {
      q = query(q, orderBy("timestamp", queryData?.current));
    } else if (whereData?.current) {
      q = query(q, where(..._where));
    }
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.forEach((item) => {
        data.push({ uid: item.id, ...item.data() });
      });
      setData(data);
    });
    return () => unsubscribe();
  }, [collectionName, queryData]);
  return { data };
};
