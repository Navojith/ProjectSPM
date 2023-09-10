import React from "react";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Swal from 'sweetalert2'

const SignupForm = () => {
    const [error , setError] = useState(false)
    const [email , setEmail] = useState(false)
    const [password , setPassword] = useState(false)

    const navigate = useNavigate()

    const handleSignup = (e) => {
        e.preventDefault()
        console.log("handle")

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                Swal.fire({
                  title: 'Success',
                  text: 'The user signed up successfully',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true
              })
                navigate("/login")
                // ...
            })
            .catch((error) => {
                setError(true)
                Swal.fire({
                  title: 'Error',
                  text: 'Signup unsuccessful, Try Again',
                  icon: 'error',
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true
              })
            });
    }

    return (
      <div>
        <form onSubmit={handleSignup}>
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col">
  <div><h3><b>Already have a account <a href = "/login"><u>Login</u> </a> </b></h3></div>
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Sign Up</h1>
    </div>
    <div className="card sm:w-[30rem] shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" required className="input input-bordered" onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" required className="input input-bordered" onChange={e=>setPassword(e.target.value)}/>
        </div>
        <div className="form-control mt-6">
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 mt-4 rounded-full">SIGNUP</button>
        </div>
      </div>
    </div>
  </div>
</div>
</form>
</div>
    );
}

export default SignupForm;