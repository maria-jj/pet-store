import "./styles.css";
import { useEffect, useState, useContext } from "react";
import{PetItem} from '../../PetItem'
import PetsOrderContext from "../../../context/petsOrderContext";
import {Search} from "../../Search";

export const PetsHomePage = () => {
  const [pets, setPets] = useState([]);
  const[filteredPets, setFilteredPets]=useState([]);
  const [loading, setLoading]=useState(true);
  const globalState = useContext(PetsOrderContext);
  const [searchString, setSearchString] = useState('');
  useEffect(
    ()=>{
      getPets();
    }, []
  );
  useEffect(
    ()=>{
      handleSearchByBreed();
    }, [searchString]
  );
const handleSearchByBreed = ()=>{
  //if search string empty dont filter
  if(searchString ===''){
    setFilteredPets(pets);
    return;
  }
  //filter
  const petsFiltered = pets.filter(
    
    (pet) =>{
      const breed = pet.breed.stringValue.indexOf(searchString.trim().toLowerCase())
      const isMatch = breed.indexOf(searchString.trim().toLowerCase());
      return isMatch !==-1;
    }

  )    
  setFilteredPets(petsFiltered);

}
  const getPets = async()=>{
    try{
      const response = await fetch('https://firestore.googleapis.com/v1/projects/pets-api-40916/databases/(default)/documents/pets/');
      const data = await response.json();
      console.log(data);
      const formatData = data.documents.map( (item)=>{
        return item.fields
      });
      setPets(formatData);      
      setFilteredPets(formatData);

      globalState.intializePets(formatData);
      setLoading(false);
    }catch(err){
      console.log(err);
      setLoading(false);

    }
  }
  const handleSearchUpdate = (event) => {
    setSearchString(event.target.value);
  }
    

  return (
    <div className="pets-page">
        <h1 className="pets-title"> All Pets </h1>    
        <div className="pets-container">
        <Search handleSearchUpdate={handleSearchUpdate}/>
        {
          filteredPets.map((pet)=>(
            <PetItem image={pet.image.stringValue} name={pet.name.stringValue} breed={pet.breed.stringValue} age={pet.age.stringValue} type={pet.petType.stringValue}
            id={pet.id.stringValue} />
            )
          )
        }
        {
          filteredPets.length ===0&&<p>Nothing found for {searchString}!</p>
        }
        {
          loading && <p>Loading data..</p>
        }
    </div>
    </div>
  );
};
