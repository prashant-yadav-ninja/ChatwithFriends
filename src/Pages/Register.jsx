import React, { useState } from "react";
import "../style.scss";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db ,storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate,Link } from "react-router-dom";
import Dimg from "../img/defaultimg.png"


const Register = () => {
  const [err, setError] = useState(false);
  const navigate = useNavigate() ;

  const defaultAvatarURL = {Dimg}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // create a user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // const storage = getStorage();

       // Check if the user provided an avatar image
    let downloadURL = defaultAvatarURL; // Set default URL initially
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
      
        (error) => {
          setError(true) ;
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {

            // update profile
            await updateProfile(res.user,{
              displayName,
              photoURL: downloadURL
            });
           
            // create user on firestore
            await setDoc(doc(db,"users",res.user.uid),{
              uid: res.user.uid, 
              displayName,
              email,
              photoURL:downloadURL
            }) ;
            

            //create empty userchats on firestore
            await setDoc(doc(db,"userChats",res.user.uid),{});
            navigate("/") ;
 
          });
        }
      );
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Friends Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Display Name" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {err && <span>Something went Wrong</span>}
        </form>
        <p>You do have an account? <Link to={"/login"}>Login</Link></p>
      </div>
    </div>
  );
};

export default Register;

// import React, { useState } from "react";
// import "../style.scss";
// import Add from "../img/addAvatar.png";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth, db, storage } from "../firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
// // import { useNavigate, Link } from "react-router-dom";

// const Register = () => {
//   const [err, setErr] = useState(false);
//   const [loading, setLoading] = useState(false);
//   // const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     setLoading(true);
//     e.preventDefault();
//     const displayName = e.target[0].value;
//     const email = e.target[1].value;
//     const password = e.target[2].value;
//     const file = e.target[3].files[0];

//     try {
//       //Create user
//       const res = await createUserWithEmailAndPassword(auth, email, password);

//       //Create a unique image name
//       const date = new Date().getTime();
//       const storageRef = ref(storage, `${displayName + date}`);

//       await uploadBytesResumable(storageRef, file).then(() => {
//         getDownloadURL(storageRef).then(async (downloadURL) => {
//           try {
//             //Update profile
//             await updateProfile(res.user, {
//               displayName,
//               photoURL: downloadURL,
//             });
//             //create user on firestore
//             await setDoc(doc(db, "users", res.user.uid), {
//               uid: res.user.uid,
//               displayName,
//               email,
//               photoURL: downloadURL,
//             });

//             //create empty user chats on firestore
//             await setDoc(doc(db, "userChats", res.user.uid), {});
//             // navigate("/");
//           } catch (err) {
//             console.log(err);
//             setErr(true);
//             setLoading(false);
//           }
//         });
//       });
//     } catch (err) {
//       setErr(true);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="formContainer">
//       <div className="formWrapper">
//         <span className="logo">Lama Chat</span>
//         <span className="title">Register</span>
//         <form onSubmit={handleSubmit}>
//           <input required type="text" placeholder="display name" />
//           <input required type="email" placeholder="email" />
//           <input required type="password" placeholder="password" />
//           <input required style={{ display: "none" }} type="file" id="file" />
//           <label htmlFor="file">
//             <img src={Add} alt="" />
//             <span>Add an avatar</span>
//           </label>
//           <button disabled={loading}>Sign up</button>
//           {loading && "Uploading and compressing the image please wait..."}
//           {err && <span>Something went wrong</span>}
//         </form>
//         <p>
//           You do have an account? 
//           {/* <Link to="/register"> */}
//             {/* Login</Link> */}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
