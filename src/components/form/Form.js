import classes from "./Form.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [inputAlert,setinputAlert] = useState("");

  const enteredNameChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };
  const enteredPasswordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };


  useEffect(()=>{
    localStorage.removeItem("token")
  },[]);// when i reload this page i want to remove the token from localstorage, so the only way one has access to the dashboard is to go through loging in.

  const navigate = useNavigate()

  const onSubmitHandler =async (e) => {
    e.preventDefault();

    try{

      const response = await fetch("http://localhost:8000/api/v1/login",{
        method:"POST",
        body:JSON.stringify({ name:enteredName,password:enteredPassword}),
        headers:{"Content-Type":"application/json"}
      });
      
      const data = await response.json()
      console.log(data)
      if(!response.ok){
        throw new Error(setinputAlert(data.msg)||"Something went")
      };
      
      localStorage.setItem("token",data.token)
      setEnteredName("");
      setEnteredPassword("");
      console.log(enteredName, enteredPassword);
      setinputAlert(data.msg)
      navigate("/dashboard");
    }catch(error){
      console.log(error)
    };


  };

  return (
    <div className={classes.container}>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="">Name</label>
          <input
            type="text"
            value={enteredName}
            onChange={enteredNameChangeHandler}
          />
        </div>
        <div className={classes.control}>
          <label>Password</label>
          <input
            type="text"
            value={enteredPassword}
            onChange={enteredPasswordChangeHandler}
          />
        </div>
        <div className={classes.action}>
          <button>Submit</button>
        </div>
       <p style={{color:"red"}}>{inputAlert}</p> 
      </form>
    </div>
  );
};

export default Form;
