// import React, { useContext } from "react";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
// import { AuthContext } from "./context/AuthContext";
// import  Dimg  from "../img/defaultimg.png"

// const Navbar = () => {
//   const { currentUser } = useContext(AuthContext);
//   console.log(currentUser);

//   return (
//     <div className="navbar">
//       <span className="logo">Friends Chat</span>
//       <div className="user">
//       <img src={currentUser.photoURL} alt="" />
//       {/* {currentUser.photoURL ? (
//           <img src={currentUser.photoURL} alt="" />
//         ) : (
//           <img
//             src={Dimg}
//             alt="Default User Profile"
//           />
//         )} */}
//         <span>{currentUser.displayName}</span>
//         <button onClick={() => signOut(auth)}>Logout</button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from './context/AuthContext'
// import Dimg from "../img/defaultimg.png"

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  console.log(currentUser.photoURL,"please tell")

  // // Define a variable to store the photo URL or use the default image
  // const photoURL = currentUser.photoURL || Dimg;

  return (
    <div className='navbar'>
      <span className="logo">Friends Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        {/* {currentUser.photoURL ? (
          <img src={Dimg} alt="User Profile" />
        ) : (
          <img src={currentUser.photoUR} alt="Default User Profile" />
        )} */}
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>logout</button>
      </div>
    </div>
  )
}

export default Navbar