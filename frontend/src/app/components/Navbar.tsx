import React, { useContext, useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

const Navbar = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  function handleSignIn() {
    if (!user) {
      // If user is not signed in, sign them in
      signInWithPopup(auth, provider)
        .then((result) => {
          // Handle successful sign-in
          console.log(result.user);
        })
        .catch((error) => {
          // Handle sign-in errors
          console.error(error);
        });
    } else {
      // If user is already signed in, sign them out
      signOut(auth)
        .then(() => {
          // Handle successful sign-out
          console.log("User signed out successfully");
        })
        .catch((error) => {
          // Handle sign-out errors
          console.error(error);
        });
    }
  }

  return (
    <div className=" bg-green py-2 ">
      <div className=" text-white max-w-7xl m-auto px-4 flex justify-between">
        <p>Snug</p>
        {user ? (
          <button onClick={handleSignIn}>Sign Out</button>
        ) : (
          <button onClick={handleSignIn}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
