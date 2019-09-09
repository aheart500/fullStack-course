import React from 'react'
const Person = ({details,deleteMe}) =>{
    const {id,name,number} = details
    return (
        <li>
            {`${name} : ${number}`} <button onClick={() => deleteMe(id,name)}>Delete</button>
        </li>
    )
}
export default Person;