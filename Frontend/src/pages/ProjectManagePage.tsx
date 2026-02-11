import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getproject, getprojectmembers, gettaskswithstatus, updatetask } from '../services/authService'
import Task from '../components/Task'
import CreateTask from '../components/CreateTask'
import BacklogBox from '../components/BacklogBox'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { DndContext, DragOverlay, pointerWithin } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import ProjectMembers from '../components/ProjectMembers'

function ProjectManagePage() {
  const { id } = useParams() as { id: string }

  const [project, setProject] = useState<Project>()
  const [tasks, setTasks] = useState<Task[]>([])
  const [creatingTask, setCreatingTask] = useState(false)
  const [members, setMembers] = useState<Member[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [refresh, setRefresh] = useState(0)

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
    status: string
  }

  type Project = {
    id: number
    name: string
    description: string
  }

  function onShow() {
    setCreatingTask(!creatingTask)
  }

  async function triggerRefresh() {
    setRefresh(prev => prev + 1)
  }

  useEffect(() => {
    async function loadProject() {
      const projResponse = await getproject(id)
      if (projResponse.ok) {
        setProject(projResponse.data)
        const taskResponse = await gettaskswithstatus('Unassigned', projResponse.data.id)
        setTasks(taskResponse.data)
        const memberResponse = await getprojectmembers(projResponse.data.id)
        setMembers(memberResponse.data)
      } else {
        console.log(projResponse.error)
      }
    }

    loadProject()
  }, [refresh, id])

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    const response = await updatetask(
      Number(active.id),
      activeTask?.name ?? '',
      activeTask?.description ?? '',
      (over?.id as string) ?? ''
    )
    if (response.ok) {
      setActiveId(null)
      setActiveTask(null)
      setRefresh(prev => prev + 1)
    } else {
      console.log(response.error)
      setActiveId(null)
      setActiveTask(null)
      setRefresh(prev => prev + 1)
    }
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event
    console.log('Drag started with ID:', active.id)
    setActiveId(active.id as string)
    const dragged = (active.data && (active.data as any).current && (active.data as any).current.task) || null
    setActiveTask(dragged)
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
      <div className="m-3 project-main">
        <h1 className="text-center">Project Management</h1>

        <div className="card container mt-4">
          <div className="d-flex flex-column col-12">
            <h3 className="p-3 m-3 rounded rounded-3 d-flex bg-light">{project?.name}</h3>

            <div className="d-flex flex-row ">
              <p className="m-3 mx-5 text-start col-7 d-flex fs-4">Description: {project?.description}</p>
              <ProjectMembers members={members} />

            </div>

            <div className="bg-light m-3 rounded rounded-3 d-flex justify-content-between align-items-center">
              <h4 className="mx-3 m-2 p-2">Task Board</h4>
            </div>

            <div className="d-flex flex-row justify-content-around mx-3 mb-3">
              <BacklogBox title="To Do" projId={id} activeId={activeId} refresh={triggerRefresh} />
              <BacklogBox title="In Progress" projId={id} activeId={activeId} refresh={triggerRefresh} />
              <BacklogBox title="Done" projId={id} activeId={activeId} refresh={triggerRefresh} />
            </div>
          </div>

          <div className="d-flex justify-content-between text-start mt-3 mb-0 rounded rounded-3 mx-3 bg-light p-1 px-3">
            <h4 className="m-2 mx-3">Task Backlog</h4>
            <button className="btn btn-primary m-3" onClick={() => setCreatingTask(true)}>
              Create New Task
            </button>
          </div>

          <div className="task-container bg-light rounded rounded-3 p-2 mx-3">
            <SortableContext items={tasks.map(t => t.id)} strategy={horizontalListSortingStrategy}>
              <div className="d-flex flex-row">
                {tasks.map(task => (
                  <Task
                    key={task.id}
                    id={task.id}
                    name={task.name}
                    description={task.description}
                    status={task.status}
                    hidden={activeId === task.id}
                    inBacklog={true}
                    refresh={triggerRefresh}
                  />
                ))}
              </div>
            </SortableContext>
          </div>

          <div hidden={!creatingTask} className="mb-3">
            <CreateTask onShow={onShow} projId={id} members={members} refresh={triggerRefresh} />
          </div>
        </div>
      </div>

      <DragOverlay className="w-50" dropAnimation={null}>
        {activeId ? (
          <Task
            id={activeId}
            name={activeTask?.name ?? tasks.find(t => t.id === activeId)?.name ?? ''}
            description={activeTask?.description ?? tasks.find(t => t.id === activeId)?.description ?? ''}
            status={activeTask?.status ?? tasks.find(t => t.id === activeId)?.status ?? ''}
            refresh={triggerRefresh}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default ProjectManagePage
