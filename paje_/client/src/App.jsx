import {useEffect, useState} from "react";
import axios from "axios";

function App () {
  
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [editingId, setEditingId] = useState(null);

  const editStudent = (student)=>{
    setEditingId(student._id);
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
  };

  const updateStudent = () =>{
    axios
    .put('http://localhost:5000/students/${editingId}', {
      name:name,
      course:course,
      age:age,
   })
   .then(() =>{
    axios
    .get("http://localhost:5000/students")
    .then((response)=>{
      setStudents(response.data);
   });

   setEditingId(null);
   setName("");
   setCourse("");
   setAge("");
  });
};

  useEffect(()=>{
    axios
    .get("http://localhost:5000/students")
    .then((response)=>{
      setStudents(response.data);
    });

  }, []);

  const addStudent = () =>{
    axios
    .post("http://localhost:5000/students", {
      name:name,
      course:course,
      age:age,
    })
    .then((response) =>{
      setStudents([...students,response.data]);
      setName("");
      setCourse("");
      setAge("");
    });
  };

  const deleteStudent = (id) => {
    axios
    .delete('http://localhost:5000/students/${id}')
    .then(() =>{
      axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      });
    });
  };


  return(
    <div>
      <h1>Student Management System</h1>

      <h2>Add Students</h2>

      <input
      placeholder="Name"
      value={name}
      onChange={(event) => setName(event.target.value)}
      />

      <br/>
      <br/>

      <input
      placeholder="Course"
      value={course}
      onChange={(event) => setCourse(event.target.value)}
      />

      <br/>
      <br/>

      <input
      type="number"
      placeholder="Age"
      value={age}
      onChange={(event) => setAge(event.target.value)}
      />

      <br/>
      <br/>

      {editingId === null? (
        <button onCLick={addStudent}>Add Student</button>
      ) : ( 
        <button onClick={updateStudent}>Update Student</button>
      )}

      <h2>Students</h2>

      {students.length === 0 && <p>No students yet.</p>}

      {students.map((student)=>(
        <div key={student.id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>

          <button onClick={() =>
            editStudent(student)}>Edit</button>
          <button onClick={() =>
            deleteStudent(student._id)}>Delete</button>  
        </div>
      ))}
    </div>
  );
}

export default App;