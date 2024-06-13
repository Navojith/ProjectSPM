import { useState , useEffect } from "react";
import { storage} from "../firebase/config";
import {ref , uploadBytesResumable , getDownloadURL} from "firebase/storage";
// import { doc, addDoc } from "firebase/firestore"; 

const useStorage = (file) =>{
    const [progress, setProgress] = useState(0);
    const [error , setError] = useState(null);
    const [url,setUrl] = useState(null);
    // const {user} = useAuth();
    // console.log(user);

    useEffect(() => {
        //references
        // const name = new Date().getTime() + file.name;
        // console.log(name);

        const metadata = {
            contentType: 'image/jpeg',
          };

        const storageRef = ref(storage , '/images' , file.name);
        const uploadTask = uploadBytesResumable(storageRef, file , metadata);

        uploadTask.on('State_changed',(snapshot) =>{
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(percentage)
            console.log('Upload is' + progress + '% done');
            switch (snapshot.state){
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;    
            }
        },(err) => {
            setError(err);
        },async () => {
               const url = await getDownloadURL(uploadTask.snapshot.ref);
               setUrl(url);
               console.log('file available at', url)

                // //store data into firestore 
                // await addDoc(doc(db, "images"), {
                //     imageurl: url,
                //     createAt: new Date()
                //   });
                        
        })
    },[file]);
    
    return {progress , url , error}
}

export default useStorage;