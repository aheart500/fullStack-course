import React from 'react'


const Header = ({name}) =>
  <h1>{name}</h1>

const Total = ({parts}) => {
  const total = parts.reduce((total,part) => total += part.exercises,0)

  return <h2>Total of {total} exercises</h2>
}
  

const Part = ({part}) =>
  <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => {
  return (
  <div>
    {parts.map(part => <Part key={part.id} part={part}/> )}
  </div>
)}

const Course = ({name,parts}) =>{
    return (
        <div>
            <Header name ={name} />
            <Content parts ={parts} />
            <Total parts = {parts} />
        </div>
    )
}
export default Course