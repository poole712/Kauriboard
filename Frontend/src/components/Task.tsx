import { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { deletetask, updatetask } from '../services/authService'

function Task({
  id,
  name,
  description,
  status,
  hidden,
  inBacklog,
  refresh,
}: {
  id: string
  name: string
  description: string
  status: string
  hidden?: boolean
  inBacklog?: boolean
  refresh: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const [editHovered, setEditHovered] = useState(false)
  const [deleteHovered, setDeleteHovered] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(name)
  const [editedDescription, setEditedDescription] = useState(description)

  const classStyle = inBacklog
    ? 'card justify-content-around d-flex mx-3 p-2 px-3 col-3 text-start align-self-start task'
    : 'card justify-content-around d-flex m-3 p-2 px-3 text-start task'

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {
      task: {
        id,
        name,
        description,
        status,
      },
    },
  })

  async function handleEdit() {
    if (!isEditing) {
      setIsEditing(true)
    } else {
      setIsEditing(false)
      console.log(Number(id), editedName, editedDescription, status)
      const response = await updatetask(Number(id), editedName, editedDescription, status)
      if (response.ok) {
        refresh()
      }
    }
  }

  async function handleDelete() {
    const response = await deletetask(id)
    if (!response.ok) {
      console.log(response.error)
    }
    refresh()
  }

  const style: React.CSSProperties = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    visibility: hidden ? 'hidden' : 'visible',
  }

  return (
    <>
      <div
        key={id}
        className={classStyle + (hovered ? ' border border-secondary' : '')}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...(!isEditing ? listeners : {})}
      >
        <div>
          <form className='d-flex flex-row justify-content-around align-items-center'>
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                value={editedName}
                style={{width: "150px"}}
                onChange={e => setEditedName(e.target.value)}
              />
            ) : (
              <h6 className="mb-0">{name}</h6>
            )}
            <div className="d-flex flex-row justify-content-end align-items-center ms-auto">
              <div
                className="dropdown float-end ms-auto mx-1"
                onPointerDown={e => {
                  e.stopPropagation() // stops drag from starting
                  e.preventDefault() // prevents dnd-kit from hijacking the click
                }}
                onMouseOver={() => setEditHovered(true)}
                onMouseLeave={() => setEditHovered(false)}
                onClick={handleEdit}
              >
                <i
                  data-no-drag
                  className={editHovered ? 'bi bi-pencil-fill' : 'bi bi-pencil'}
                  style={{ fontSize: '25px', cursor: 'pointer' }}
                ></i>
              </div>
              <div
                className="dropdown float-end ms-auto mx-1"
                onPointerDown={e => {
                  e.stopPropagation() // stops drag from starting
                  e.preventDefault() // prevents dnd-kit from hijacking the click
                }}
                onMouseOver={() => setDeleteHovered(true)}
                onMouseLeave={() => setDeleteHovered(false)}
                onClick={handleDelete}
              >
                <i
                  data-no-drag
                  className={deleteHovered ? 'bi bi-trash-fill' : 'bi bi-trash'}
                  style={{ fontSize: '25px', cursor: 'pointer' }}
                ></i>
              </div>
            </div>
          </form>
        </div>

        <form className='mt-1'>
          {isEditing ? (
            <input
              type="text"
              className="form-control"
              value={editedDescription}
              onChange={e => setEditedDescription(e.target.value)}
            />
          ) : (
            <p>{description}</p>
          )}
        </form>
      </div>
    </>
  )
}

export default Task
