import React, { useContext, useEffect, useState } from "react";

const Navbar = ({ user, handleSignIn }) => {
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
