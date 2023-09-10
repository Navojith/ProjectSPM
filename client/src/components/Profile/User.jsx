import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { getStorage, ref, listAll, getDownloadURL , deleteObject } from "firebase/storage";
import '../../CSS/menu.css';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const User = () => {
const storage = getStorage();
const navigate = useNavigate();

const [currentUser , setCurrentUser] = useState(null);
const [images, setImages] = useState([])

useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log(user);
      setCurrentUser(user);
    }
  }
)
},[])



// useEffect(() => {
//   const loadImages = () => {
//     if(currentUser) {
//       const listRef = ref(storage, `gallery/${currentUser.uid}`);
  
//       listAll(listRef)
//       .then(async(res) => {
//         res.prefixes.forEach((folderRef) => {
          
          
//         });
//         res.items.forEach(async(itemRef) => {
//           // All the items under listRef.
//           const url = await getDownloadURL(itemRef)
//           setImages([...images,url]);
//         });
//       }).catch((error) => {
//         alert(error)
//       });
//     }
//   },[currentUser])

  useEffect(() => {
    const loadImages = () => {
      if(currentUser) {
        const listRef = ref(storage, `gallery/${currentUser.uid}`);
    
        listAll(listRef)
        .then(async(res) => {
          res.prefixes.forEach((folderRef) => {
            
            
          });
          res.items.forEach(async(itemRef) => {
            // All the items under listRef.
            const url = await getDownloadURL(itemRef)
            setImages([...images, url]);
          });
        }).catch((error) => {
          alert(error)
        });
      }
    }
    
    loadImages();
    console.log(images);
  
  },[currentUser])
  

//delete Image
function deleteImage(image){
  console.log(image);
  const desertRef = ref(storage, image);
  // Delete the file
  deleteObject(desertRef).then(() => {
    console.log('deleted');
    Swal.fire({
      title: 'Success',
      text: 'Image Deleted Successfully',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
  })
  window.location.reload();
    }).catch((error) => {
    console.log('not deleted');
    Swal.fire({
      title: 'Error',
      text: error,
      icon: 'error',
      showConfirmButton: false,
      timer: 1000,
  })
  });
// const user = auth.currentUser;
// //delete User
// function deleteAccount(user){
//   console.log(user)
//   deleteUser(user).then(() => {
//     Swal.fire({
//       title: 'Success',
//       text: 'User logout Successfully',
//       icon: 'success',
//       showConfirmButton: false,
//       timer: 2000,
//       timerProgressBar: true
//   })
//   }).catch((error) => {
//     console.log('not deleted');
//     Swal.fire({
//       title: 'Error',
//       text: error,
//       icon: 'error',
//       showConfirmButton: false,
//       timer: 1000,
//   })
//   });

}

// Create a reference under which you want to list

    return (
      <div style = {{margin:"20px"}}>
        <nav class="  bg-gray-900">
          <div>
            <div>
              <ul>
                <li>
                  {!currentUser ? (
                    <button>Login</button>
                    ) : (
                    <p>
                      {currentUser?.email?.toString(0)?.toUpperCase()}  
                    </p>     
                    )}
                </li>
                <li>
                  <a href = '/getstarted'>
                      {/* onClick={() => handleLogout(currentUser.uid)}> */}
                      Logout
                  </a>
                </li>
                <li>
                  <a href = '/getstarted'>
                  Home
                  </a>
                </li>
                <li>
                  <a href = '/uploadImage'>
                    UploadImage
                  </a>
                </li>
                <li>
                  <a href = '/getstarted' >
                    <button>
                        Delete Account
                    </button> 
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div style={{padding:"100px"}}></div>
        < div style={{ padding: "20px" }}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => 
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} /></figure>
            <div className="card-body w-96 h-30">
              <div className="card-actions justify-end">
                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 mt-4 rounded-full" >
                 {/* onClick={() => updateImage(image)} */}
                  Image Preprocessing
                  {/* <updateModal /> */}
                </button>
                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 mt-4 rounded-full" onClick={() => deleteImage(image)}>Delete</button>
              </div>
            </div>
          </div>
          )}
        </div>  
        </div>
      </div>
    );
};

export default User