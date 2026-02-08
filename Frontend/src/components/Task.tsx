import { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { deletetask } from '../services/authService'

function Task({
  id,
  name,
  description,
  hidden,
  inBacklog,
  refresh,
}: {
  id: string
  name: string
  description: string
  hidden?: boolean
  inBacklog?: boolean
  refresh: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const classStyle = inBacklog
    ? 'card justify-content-around d-flex mx-3 p-2 px-3 col-3 text-start bg-light task'
    : 'card justify-content-around d-flex m-3 px-3 p-2 text-start task'

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {
      task: {
        id,
        name,
        description,
      },
    },
  })

  async function handleEdit() {}

  async function handleDelete() {
    const response = await deletetask(id);
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
    <div
      key={id}
      className={classStyle + (hovered ? ' border border-secondary' : '')}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={setNodeRef}
      style={style}
      {...listeners}
      onPointerDown={e => {
        if ((e.target as HTMLElement).closest('[data-no-drag]')) {
          e.stopPropagation()
          return
        }
        listeners?.onPointerDown?.(e)
      }}
      {...attributes}
    >
      <div className="d-flex flex-row">
        <h5>{name}</h5>
        <div className="dropdown float-end ms-auto">
          <i
            data-no-drag
            className="bi bi-three-dots-vertical"
            style={{ fontSize: '25px', cursor: 'pointer' }}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></i>
          <ul className="dropdown-menu">
            <li data-no-drag>
              <a className="dropdown-item" onClick={handleEdit}>
                Edit
              </a>
            </li>
            <li data-no-drag>
              <a className="dropdown-item" onClick={handleDelete}>
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p>{description}</p>
    </div>
  )
}

export default Task
