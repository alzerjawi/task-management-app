import Modal from "./Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

const TaskHeader = ({title, accessData}) => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [showModal, setShowModal] = useState(false)

    const signOut = () => {
        console.log('signout');
        removeCookie('Email')
        removeCookie('AuthorizationIs')
        window.location.reload()
    }

    return (
      <div className="task-header">
        <h1>{title}</h1>
        <div className="btn-container">
            <button className="add" onClick={() => setShowModal(true)}>Add Task</button>
            <button className="sign-out" onClick={signOut}>Sign Out</button>
        </div>
        {showModal && <Modal mode={'add'} setShowModal={setShowModal} accessData={accessData}/>}
      </div>
    );
  }
  
  export default TaskHeader;