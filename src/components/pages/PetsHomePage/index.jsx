import "./styles.css";
import { useEffect, useState, useContext } from "react";
import{PetItem} from '../../PetItem'
import PetsOrderContext from "../../../context/petsOrderContext";

export const PetsHomePage = () => {
  const [pets, setPets] = useState([]);
  const globalState = useContext(PetsOrderContext);

  useEffect(
    ()=>{
      getPets();
    }, []
  );

  const getPets = async()=>{
    try{
      const response = await fetch('https://firestore.googleapis.com/v1/projects/pets-api-40916/databases/(default)/documents/pets/');
      const data = await response.json();
      console.log(data);
      const formatData = data.documents.map( (item)=>{
        return item.fields
      });
      setPets(formatData);
      globalState.intializePets(formatData);
    }catch(err){
      console.log(err);
    }
  }
    

  return (
    <div className="pets-page">
        <h1 className="pets-title"> All Pets </h1>    
        <div className="pets-container"></div>
        {
          pets.map((pet)=>(
            <PetItem image={pet.image.stringValue} name={pet.name.stringValue} breed={pet.breed.stringValue} age={pet.age.stringValue} type={pet.petType.stringValue}
            id={pet.id.stringValue} />
            )
          )
        }
    </div>
  );
};
