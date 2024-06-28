import TaskMark from './TaskMark';
import Completeness from './Completeness';
import Modal from './Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import 'bootstrap/dist/css/bootstrap.css';

const Task = ({ task, accessData }) => {
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleNote = () => {
    setOpen(!open);
  };

  const removeTask = async () => {
    try {
      const result = await fetch(`http://localhost:8000/task/${task.id}`, {
        method: 'DELETE',
      });
      if (result.status === 200) {
        accessData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <li className="task">
        <div className="task-container">
          <TaskMark />
          <p className="t-title">{task.title}</p>
          <>
            <Button
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              {open ? 'Close Note' : 'Note'}
            </Button>
          </>
          <Completeness completeness={task.completeness} />
        </div>
  
        <div className="btn-container">
          <button className="edit" onClick={() => setShowModal(true)}>
            Edit
          </button>
          <button className="remove" onClick={removeTask}>
            Remove
          </button>
        </div>
        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} accessData={accessData} task={task} />}
      </li>
      <Collapse in={open}>
        <div className="t-description" id="example-collapse-text">
          {task.description}
        </div>
      </Collapse>
    </div>
  );
};

export default Task;