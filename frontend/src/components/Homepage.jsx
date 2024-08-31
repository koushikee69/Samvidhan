import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function Homepage() {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/Login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  return (
    <div>
      {userDetails ? (
        <>
            <img
              src={userDetails.photo}
              width={"10%"}
              style={{ borderRadius: "50%" }}
            />
          <h3>Welcome {userDetails.name}</h3>
          <div>
            <p>Email: {userDetails.email}</p>
          </div>
          <button onClick={handleLogout}>
            Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default Homepage;