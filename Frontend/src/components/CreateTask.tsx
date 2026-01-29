import { useState } from 'react'
import { createtask } from '../services/authService'

type Member = {
  id: number
  username: string
  email: string
  role: string
}

function CreateTask({ onShow, projId, members, loadTasks }: { onShow: () => void; projId: string; members?: Member[]; loadTasks: () => void }) {
  const [name, setName] = useState('')
  const [status] = useState('ToDo')
  const [description, setDescription] = useState('')
  const [assignedMember, setAssignedMember] = useState<Member>()

  async function handleSubmit() {
    // Implement task creation logic here
    const response = await createtask(name, description, status, assignedMember!.id, projId)
    console.log(assignedMember)
    if (response.ok) {
      loadTasks()
      onShow()
      console.log('Task Created:', { name, description })
    } else {
      console.log('Task not created')
    }
  }

  return (
    <form className="d-flex flex-row bg-light p-2 px-4 mx-3 justify-content-between align-items-center">
      <div className="mb-3 col-3">
        <label className="form-label float-start" htmlFor="name">
          Task Name
        </label>
        <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} id="name" />
      </div>
      <div className="mb-3 col-4">
        <label className="form-label float-start" htmlFor="description">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
          id="description"
        />
      </div>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Member Assignment
        </button>
        <ul className="dropdown-menu">
          {members?.map(member => (
            <li key={member.id}>
              <a className="dropdown-item" href="#" onClick={() => setAssignedMember(member)}>
                {member.username}
              </a>
            </li>
          ))}
        </ul>
        
      </div>
      <button type="button" className="btn btn-primary col-1 " onClick={handleSubmit}>
        Add Task
      </button>
      <button type="button" className="btn btn-danger col-1 " onClick={onShow}>
        Cancel
      </button>
    </form>
  )
}

export default CreateTask
