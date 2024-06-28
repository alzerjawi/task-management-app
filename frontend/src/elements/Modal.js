import {useState} from 'react'
import { useCookies } from 'react-cookie'


const Modal = ({mode, setShowModal, accessData, task}) => {
  const editMode = mode === 'edit' ? true : false
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [data, setData] = useState({
    u_email: editMode ? task.u_email : cookies.Email,
    title: editMode ? task.title : null,
    description: editMode ? task.description : null,
    completeness: editMode ? task.completeness : 50,
    date: editMode ? task.date : new Date()
  })

  const sendData  = async (e) => {
    e.preventDefault()
    try {
      const result = await fetch(`http://localhost:8000/task`, {
        method: "POST", 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
       })
       if (result.status === 200){
        console.log('Ok')
        setShowModal(false)
        accessData()
       }
      
    } catch(err){
      console.error(err)
    }
  }

  const changeData = async(e) => {
    e.preventDefault()
    try{
      const result = await fetch(`http://localhost:8000/task/${task.id}`, {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
      })
      if (result.status === 200){
        setShowModal(false)
        accessData()
       }
    } catch (err){
      console.error(err)
    }
  }
  
  const handleChange = (e) => {
    const {name, value} = e.target

    setData(data => ({
      ...data, 
      [name] : value
    }))

    console.log(data)
  }

  return (
      <div className='cover'>
        <div className='Modal'>
          <div className='form-title-container'>
            <h3>{mode} a task</h3>
            <button onClick={() => setShowModal(false)}>X</button>
          </div>

          <form>
            <input required 
            maxlength={30}
            placeholder="Task title"
            name="title"
            value={data.title}
            onChange={handleChange}
            />
            <input
            maxlength={300}
            placeholder="Task description"
            name="description"
            value={data.description}
            onChange={handleChange}
            />
            <br/>
            <label for="range">Place your current completeness</label>
            <input 
              required
              type="range"
              id="range"
              min="0"
              max="100"
              name="completeness"
              value={data.completeness}
              onChange={handleChange}
            />
            <input className={mode} type='submit' onClick={editMode ? changeData: sendData} />
          </form>

        </div>
      </div>
    );
  }
  
  export default Modal;