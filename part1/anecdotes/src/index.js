import React, { useState } from 'react'
import ReactDOM from 'react-dom'
// I'm very sorry this isn't my code but I forced git push to the repository and lost Part0 and Part1 So I took this code to replace the old
const getHighestVoteIndex = (scores) => {
  let highest = scores[0]
  let highestIndex = 0
  for (let i = 1; i < scores.length; i++) {
    if (scores[i] > highest) {
      highest = scores[i];
      highestIndex = i;
    }
  }
  return highestIndex;
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [scores, setScores] = useState(new Array(anecdotes.length).fill(0))
  //console.log(scores)
  const highestVoteIndex = getHighestVoteIndex(scores)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote index={selected} votes={scores[selected]} />
      <button onClick={() => incrementScore(scores, setScores, selected)}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Anecdote index={highestVoteIndex} votes={scores[highestVoteIndex]} />
      
    </div>
  )
}

const incrementScore = (get, set, index) => {
  const newArr = [...get]
  newArr[index] += 1
  set(newArr)
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Anecdote = ({index, votes}) => {
  return (
    <>
    {anecdotes[index]} <br/>
    has {votes} votes <br/>
    </>
  )
}



ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)