import React, {useState,useEffect} from 'react';
import PersonsServices from './Services/Persons'
import Person from './Components/Person';
import Notifaction from './Components/Notifaction'
const App = ()=>{

  const [newName,setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [search,setSearch] = useState('')
  const [persons,setPersons] = useState([])
  const [errorMessage,setErrorMessage] = useState(null)

  const ms = 3000

  useEffect(()=> {
    PersonsServices.getPersons().then(savedPersons => setPersons(savedPersons))
  },[])
  
  const deleteMe = (id,name) => {
    if(window.confirm(`Are you sure you want to delete ${name} from the contacts ?`)){
      PersonsServices.deletePerson(id).catch(() => {
        setErrorMessage({message : `${name} is already deleted from the server` , status:'failure'})
        setTimeout(()=> {setErrorMessage(null)},ms)
      })

      setPersons(persons.filter(person=> person.id !== id))
      setErrorMessage({message: 'Deleted Successfully!',status:'success' })
      setTimeout(()=> {setErrorMessage(null)},ms)

    }

}


const showPersons = () =>{
  const filter = new RegExp(search,'gi')
  let personsToShow = filter === '' ? [...persons] : persons.filter(person => person.name.match(filter))
  personsToShow = personsToShow.map(person => <Person key={person.id} details={person} deleteMe={deleteMe} />)
  return <ul>{personsToShow}</ul>
}


const saveNew = (event) => {
  event.preventDefault()
  const newOne = persons.find(person => person.name === newName)
  if (typeof newOne !== 'undefined'){
    if(window.confirm(`${newName} already exists in the list. Do you wanna replace the old number with the new ?`)){
     PersonsServices.updatePerson(newOne.id,{...newOne,number : newNumber})
      .then(updatedPerson => setPersons(persons.map(person => person.id === newOne.id ? updatedPerson : person)))
        .then(()=> {
          setErrorMessage({message:`${newOne.name} was updated successfully`,status:'success'})
          
        })
          .catch(() =>{ 
            setErrorMessage({message:'There was an error please try again',status:'failure'})
          }).then(()=> setTimeout(()=> {setErrorMessage(null)},ms))
     
    }
  }else{
  const newPerson = {name : newName, number : newNumber}
  PersonsServices.addPerson(newPerson).then(newSaved => setPersons(persons.concat(newSaved)))
    .then(()=> {
      setErrorMessage({message:`${newPerson.name} was added successfully`,status:'success'})
    })
      .catch(()=> { 
        setErrorMessage({message: 'There was an error please try again',status:'failure'}) 
        
      }).then(()=> {
        setNewName('')
        setNewNumber('')
        setTimeout(()=> {setErrorMessage(null)},ms)
      })
  }
}




  return (
    <div>
      <Notifaction message={errorMessage}  />
      <div>
        <h2>Search Contancts : </h2>
        <label htmlFor='search'>Write the name to look for : </label>
        <input type='text' id='search' value={search} onChange={(event)=> setSearch(event.target.value)} />
      </div>
      <div>
        <form onSubmit={saveNew}>
        <h2>Add New : </h2>
        <label htmlFor='newName'>Write the name of the new number : </label>
        <input type='text' id='newName' value={newName} onChange={(event)=> setNewName(event.target.value)} />
        <br />
        <label htmlFor='newNumber'>Write the number : </label>
        <input type='text' id='newNumber' value={newNumber} onChange={(event)=> setNewNumber(event.target.value)} />
        <br />
        <button type="submit">Save New </button>
        </form>
      </div>
      <div>
        <h2>Contancts : </h2>
        {showPersons()}
      </div>
    </div>
  )
}


export default App;
