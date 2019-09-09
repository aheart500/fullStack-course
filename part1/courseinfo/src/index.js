import React from 'react';
import ReactDOM from 'react-dom';
// I'm very sorry this isn't my code but I forced git push to the repository and lost Part0 and Part So I took this code to replace the old
const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [{
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }]
    };

    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
}

const Header = props => {
    return (
        <div>
            <h1>{props.course.name}</h1>
        </div>
    );
}

const Content = props => {
    return props.parts.map(part =>
        <Part name={part.name} exercises={part.exercises} key={part.name}/>
    );
}

const Part = (props) => {
    let { name, exercises } = props;
    return <div>
        {name} {exercises}
    </div>;
}

const Total = props => {
    const parts = props.parts;
    return <div>
        Number of exercises {parts.reduce((counter, part) => counter + part.exercises, 0)}
    </div>;
}
ReactDOM.render(<App />, document.getElementById('root'));
