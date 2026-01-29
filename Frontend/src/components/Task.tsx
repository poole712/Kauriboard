import { useState } from 'react'

function Task({ id, name, description }: { id: string; name: string; description: string }) {

  const [hoveredDelete, setHoveredDelete] = useState(false)
  const [hoveredEdit, setHoveredEdit] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <>
      <div key={id} className={"card justify-content-around d-flex m-3 p-3 col-3 text-start  " + (hovered ? 'border border-secondary task' : '')} 
      onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <h4>{name}</h4>
        <p>{description}</p>
        <i
          onMouseOver={() => setHoveredDelete(true)}
          onMouseLeave={() => setHoveredDelete(false)}
          className={hoveredDelete ? 'bi bi-trash3-fill col-1' : 'bi bi-trash3 col-1'}
          style={{ fontSize: '25px', cursor: 'pointer', color: 'red', marginLeft: 'auto' }}
        ></i>
      </div>
    </>
  )
}

export default Task
