import {useParams}from 'react-router-dom'
import {useContext, useEffect, useState} from 'react';
import "./styles.css"
import PetsOrderContext from '../../../context/petsOrderContext';

export const PetsDetailsPage = (props)=>{
    const {id}=useParams();
    const [pet, setPet]=useState({});
    const globalState = useContext(PetsOrderContext);

    useEffect(()=>{
        const pet = globalState.pets.find(
            (pet)=>pet.id.stringValue === id
            );
        setPet(pet);
    },[])
    if (pet){
        return (
            <div className="pets-page">
                <h1 className="pets-title">{pet.name?.stringValue}</h1>
                <img src={pet.image?.stringValue} alt="image" />
            </div>
        )
    }else {
        return <p>no pets with this id</p>
    }


}