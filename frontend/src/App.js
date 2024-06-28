import TaskHeader from "./elements/TaskHeader";
import Task from "./elements/Task";
import { useEffect, useState } from 'react';
import Authorization from "./elements/Authorization";
import { useCookies } from "react-cookie";
import Header from "./elements/Header";
import Footer from "./elements/Footer";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authorizationIs = cookies.AuthorizationIs;
  const u_email = cookies.Email;
  const username = cookies.Username;
  const [tasks, setTasks] = useState(null);

  const accessData = async () => {
    try {
      const result = await fetch(`http://localhost:8000/task/${u_email}`);
      const json = await result.json();
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log('Email:', u_email);
    console.log('Username:', username);
    console.log('AuthorizationIs:', authorizationIs);

    if (authorizationIs) {
      accessData();
    }
  }, [authorizationIs]);

  useEffect(() => {
    console.log('Updated username in useEffect:', username);
  }, [username]);

  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="app">
      <Header authorizationIs={authorizationIs} />
      {!authorizationIs && <Authorization />}
      {authorizationIs && (
        <>
          <TaskHeader title={"What to do?"} accessData={accessData} />
          <p className="greeting">Hello {username}</p>
          {sortedTasks?.map((task) => (
            <Task key={task.id} task={task} accessData={accessData} />
          ))}
        </>
      )}
      <p className="app-name">Task Management App</p>
      <Footer />
    </div>
  );
}

export default App;
