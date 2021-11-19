import {useState} from 'react';
import {useForm} from 'react-hook-form';
import './styles.css';

export const LoginPage = ()=>{
    const [mode,setMode]=useState("login");

    const {register, handleSubmit}=useForm();
    const loginUser = (formVals)=>{
        console.log("login submitted", formVals)
    }
    const signUpUser =(formVals)=>{
        console.log("sign up submitted", formVals)

    }
  
    return(
        <div className="pets-page">
            {mode === "login" &&(
                <form className="form-layout" onSubmit={handleSubmit(loginUser)}>
                    <h2>Welcome back, please sign in!</h2>
                    <br />
                    <label htmlFor="user">Username</label>
                    <input type="email" name="user" required {...register('user')}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required {...register('password')}/>
                    <input type="submit" value="Login"/>
                    <br />
                    <p>Dont have an acc? create new</p>
                    <button onClick={()=>setMode("signup")}>sign up</button>
                </form>
            )}

            {mode === "signup" &&(
                <form className="form-layout"  onSubmit={handleSubmit(signUpUser)}>
                    <h2>create new account</h2>
                    <br />
                    <label htmlFor="user">Username</label>
                    <input type="email" name="user" required {...register('user')}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required {...register('password')}/>
                    <label htmlFor="passwordConfirm">Password</label>
                    <input type="password" name="passwordConfirm" required/>
                    <input type="submit" value="sign up"/>
                    <br />
                    <p>have an account already?</p>
                    <button onClick={()=>setMode("login")}>login</button>
                </form>
            )}
        </div>
      
    )
}