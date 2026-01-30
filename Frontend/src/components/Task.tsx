import { useState } from 'react'

function Task({ id, name, description }: { id: string; name: string; description: string }) {
  const [hoveredDelete, setHoveredDelete] = useState(false)
  const [hoveredEdit, setHoveredEdit] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <>
      <div
        key={id}
        className={
          'card justify-content-around d-flex m-3 p-3 col-3 text-start' +
          (hovered ? ' border border-secondary task' : '')
        }
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="d-flex flex-row">
          <h4>{name}</h4>
          <div className="dropdown float-end ms-auto">
            <i
              className="bi bi-three-dots-vertical"
              style={{ fontSize: '25px', cursor: 'pointer' }}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            ></i>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Edit
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p>{description}</p>
      </div>
    </>
  )
}

export default Task
