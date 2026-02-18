import { useDroppable } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { gettaskswithstatus } from '../services/authService'
import Task from './Task'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

type Task = {
  id: string
  name: string
  description: string
}


function BacklogBox({ title, projId, activeId, refresh }: { title: string; projId: string; activeId?: string | null; refresh: () => void }) {
  const [tasks, setTasks] = useState<Task[]>([])

  const { isOver, setNodeRef } = useDroppable({
    id: title.replace(/\s+/g, ''),
  })

  const style = {
    backgroundColor: isOver ? 'lightgreen' : undefined,
  }

  useEffect(() => {
    async function loadTasks() {
      const response = await gettaskswithstatus(title.replace(/\s+/g, ''), projId)
      if (response.ok) setTasks(response.data)
    }
    loadTasks()
  }, [title, projId, refresh,])

  return (
    <div className="backlog-box" ref={setNodeRef} style={style}>
      <h5 className="backlog-box-title">{title}</h5>

      <SortableContext items={tasks.map(t => t.id)} strategy={horizontalListSortingStrategy}>
        <div className="d-flex flex-column overflow-y-auto hide-y-scrollbar align-items-center" style={{ maxHeight: '400px' }}>
          {tasks.map(task => (
            <Task key={task.id} id={task.id} name={task.name} description={task.description} status={title} inBacklog={false} hidden={activeId === task.id} refresh={refresh}/>
          ))}
        </div>
      </SortableContext>
    </div>
  )
}

export default BacklogBox
