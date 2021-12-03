import {useForm} from "react-hook-form";
import {useHistory}from "react-router-dom";
import "./styles.css";
import {useState} from "react";
export const NewPetPage = () =>{
    const {register, handleSubmit}=useForm();
    const history=useHistory();

    const submitPet=async(formVals)=>{
        const formattedData={
            fields:{
                id:{
                    stringValue: formVals.id
                },
                breed:{
                    stringValue: formVals.breed
                },
                age:{
                    stringValue: formVals.age
                },
                name:{
                    stringValue: formVals.name
                },
                isAdopted:{
                    boolean: false
                },
            }
        } 
        console.log(formVals, formattedData);
        try{
                    const response= await fetch('https://firestore.googleapis.com/v1/projects/tutorial-last-17bd8/databases/(default)/documents/pets/',
          {
            headers: {
                'Content-Type': 'application/json'
            },
                method: "POST",
                body: JSON.stringify(formattedData)
            })
            history.pushState('/');
            }catch (error){
                console.log("error",error);
            }
            
        };
            
    return(
        <div className="pets-page">
        <form className="form-layout" onSubmit={handleSubmit(submitPet)}>
        <h2>Submit a new page</h2>
        <br/>
        <label htmlFor="petType">Pet Type</label>
        <input
        {...register("petType")}
        name="petType"
        required
        />
        <label htmlFor="name">name</label>
        <input {...register("name")} name="name" required type="text"/>
        <label htmlFor="breed">Breed</label>
        <input {...register("breed")}
        name="breed"
        required
        />
        <label htmlFor="image">Image Url</label>
        <input
        {...register("image")}
        name="image"
        required
        />
        <label htmlFor="age">Age</label>
        <input {...register("age")}
        name="age"
        required
        />
        <label htmlFor="id">Unique ID</label>
        <input {...register("id")}
        name="id"
        required
        />
        <input type="submit" value="submit pet"/>
        <br/>
        </form>
        
        </div>
        ); };
   