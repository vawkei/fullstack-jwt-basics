import { useEffect, useState } from "react";
import classes from "./Dashboard.module.css";

const Dashboard = () => {
  const [number, setNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [noTokenMsg, setNoTokenMsg] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      getDashboard();
    } else {
      getDashboardNoToken();
    }
  }, []);

  const getDashboard = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8000/api/v1/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`, // we have to set the token here manually to Authorization using localstorage
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();

      console.log(data);
      setNumber(data.number);
      setUserName(data.userName);
      setUserId(data.userId);
    } catch (error) {
      //   console.log(error);
    }
  };

  const getDashboardNoToken = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/dashboard");

      const data = await response.json();
      if (!response.ok || !response.headers) {
        throw new Error(setNoTokenMsg(data.msgOne) || data.msgOne);
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      {!token ? (
        <p>{noTokenMsg}</p>
      ) : (
        <>
          <h1 className={classes["container-h1"]}>This is the Dashboard</h1>
          <div>
            <h1 className={classes["container-h1"]}>
              Your Dashboard Number is:{number}{" "}
            </h1>
            <div className={classes.content}>
              <p>{userId}:</p>
              <h3>{userName}</h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
