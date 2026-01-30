import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getproject, getprojectmembers, gettasks } from '../services/authService'
import Task from '../components/Task'
import CreateTask from '../components/CreateTask'
import BacklogBox from '../components/BacklogBox'

function ProjectManagePage() {
  const { id } = useParams() as { id: string }

  const [project, setProject] = useState<Project>()
  const [tasks, setTasks] = useState<Task[]>([])
  const [creatingTask, setCreatingTask] = useState(false)
  const [members, setMembers] = useState<Member[]>([])

  type Member = {
    id: number
    username: string
    email: string
    role: string
  }

  type Task = {
    id: string
    name: string
    description: string
  }

  type Project = {
    id: number
    name: string
    description: string
  }

  function onShow() {
    setCreatingTask(!creatingTask)
  }

  async function loadTasks() {
    const taskResponse = await gettasks(id)
    setTasks(taskResponse.data)
  }

  useEffect(() => {
    async function loadProject() {
      const projResponse = await getproject(id)
      if (projResponse.ok) {
        setProject(projResponse.data)
        const taskResponse = await gettasks(projResponse.data.id)
        setTasks(taskResponse.data)
        const memberResponse = await getprojectmembers(projResponse.data.id)
        console.log(memberResponse.data)
        setMembers(memberResponse.data)
      } else {
        console.log(projResponse.error)
      }
    }

    loadProject()
  }, [id])

  return (
    <div className="m-3 project-main">
      <h1 className="text-center">Project Management</h1>
      <div className="card container mt-4">
        <div className="d-flex flex-column col-12">
          <h2 className="p-3 m-3 rounded rounded-3 d-flex bg-light">{project?.name}</h2>
          <div className="d-flex flex-row ">
            <p className="m-3 mx-5 text-start col-7 d-flex fs-4">Description: {project?.description}</p>
            <div className="d-flex flex-column col-4 m-3 ">
              <h5 className="align-self-center">Members:</h5>
              <ul className="align-self-center">
                {members.map(member => (
                  <li key={member.id}>
                    {member.username} ({member.role})
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-light m-3 rounded rounded-3 d-flex justify-content-between align-items-center">
            <h3 className="m-3 p-2">Task Board</h3>
          </div>
          <div className="d-flex flex-row justify-content-around mx-3 mb-3">
            <BacklogBox title="To Do" />
            <BacklogBox title="In Progress" />
            <BacklogBox title="Done" />
          </div>
        </div>
        <div className='d-flex justify-content-between text-start mt-3 mb-0 rounded rounded-3 mx-3 bg-light p-3'>
          <h4 className="">Task Backlog</h4>
          <button className="btn btn-primary m-3" onClick={() => setCreatingTask(true)}>
            Create New Task
          </button>
        </div>
        <div className="task-container bg-light rounded rounded-3 p-3 mx-3">
          <div className="d-flex flex-row">
            {tasks.map(task => (
              <Task key={task.id} id={task.id} name={task.name} description={task.description} />
            ))}
          </div>
        </div>
        <div hidden={!creatingTask} className="mb-3">
          <CreateTask onShow={onShow} projId={id} members={members} loadTasks={loadTasks} />
        </div>
      </div>
    </div>
  )
}
export default ProjectManagePage
