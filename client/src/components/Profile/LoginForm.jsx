import React from "react";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Swal from 'sweetalert2'

const LoginForm = () => {
    const [error , setError] = useState(false)
    const [email , setEmail] = useState(false)
    const [password , setPassword] = useState(false)

    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        console.log("handle")

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                Swal.fire({
                  title: 'Success',
                  text: 'The user logged in successfully',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true
              })
                navigate("/profile")
                // ...
            })
            .catch((error) => {
                setError(true)
                Swal.fire({
                  title: 'Error',
                  text: 'Login unsuccessful, Try Again',
                  icon: 'error',
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true
              })
            });
    }

    return (
        <form onSubmit={handleLogin}>
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col ">
  <div><h3><b>Don't have an account <a href = "/signup"><u>Signup</u> </a> </b></h3></div>
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
    </div>
    <div className="card sm:w-[30rem] shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required onChange={e=>setEmail(e.target.value) } />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered"required onChange={e=>setPassword(e.target.value)}/>
          <label className="label">
            <a href="/setPassword" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 mt-4 rounded-full">Login</button>
        </div>
        {error && <span>Incorrect email or password!</span>}
      </div>
    </div>
  </div>
</div>
</form>
    );
};

export default LoginForm;