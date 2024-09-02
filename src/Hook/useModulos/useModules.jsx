import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import appFirebase from "../../credenciales";

const db = getFirestore(appFirebase);

const useUserModules = (uid) => {
  const [modules, setModules] = useState({});

  useEffect(() => {
    const fetchUserModules = async () => {
      const userDocRef = doc(db, "users", uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setModules(data.modules || {});
      }
    };
    fetchUserModules();
  }, [uid]);

  return modules;
};

export default useUserModules;
