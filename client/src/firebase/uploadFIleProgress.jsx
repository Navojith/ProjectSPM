import { ref , getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {storage} from "./config";
import Swal from 'sweetalert2';

const uploadFileProgress = (file , subFolder , imageName ) => {
    return new Promise((resolve , reject)=>{
        const storageRef = ref(storage, subFolder + '/' + imageName)
        const upload = uploadBytesResumable(storageRef, file)
        upload.on('state_change',(snapshot) => {
            const progress = (snapshot.bytesTransferred/ snapshot.totalBytes)*100
            console.log(progress);
            if(progress == 100){
                Swal.fire({
                    title: 'Success',
                    text: 'Image uploaded Successfully',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                })
            }
            // setProgress(progress)
        } , (error)=>{
            reject(error)
            Swal.fire({
                title: 'Error',
                text: error,
                icon: 'error',
                showConfirmButton: false,
                timer: 1000,
            })
        } ,async() => {
            try{
                const url = await getDownloadURL(storageRef)
                resolve(url)
            }catch (error){
                reject(error)
            }
        })
    })
}

export default uploadFileProgress