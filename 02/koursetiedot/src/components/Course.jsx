

const Header = (props) => {
    console.log(props)
    return (
      <h1>{props.course.name}</h1>
    );
  };
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name}
        {props.part.exercises}
      </p>
    );
  };
  
  const Content = (props) => {
    const { parts } = props;
  
    return (
      <div>
        {parts.map((part, index) => (
          <Part key={index} part={part} />
        ))}
      </div>
    );
  };

  const Total = ( {course} ) => {
    const total = course.parts.map(x => x.exercises).reduce( (s, p) => s + p, 0)
    return (
      <>
      <b>total of {total} exercises</b> 
      </>
    )
  }
  

const Course = ({ course }) => {
    return (
      <>
        <Header course={course}/>
        <Content parts={course.parts}/>
        <Total course={course} />
      </>
    )
  }

  export default Course