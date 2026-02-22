import { useState } from 'react'
import { deleteproject } from '../services/authService'
import { useNavigate } from 'react-router'

function ProjectManageDropdown({ projId }: { projId: string }) {
  const [hovered, setHovered] = useState(false)

  const navigate = useNavigate()

  async function DeleteProject() {
    const response = await deleteproject(projId)
    if (response.ok) {
      console.log('Project Successfully deleted')
      navigate('/pages/Projects')
    } else {
      console.log('Failed to delete project')
    }
  }

  return (
    <div className="dropdown mx-2">
      <i
        className={hovered ? 'bi bi-gear' : 'bi bi-gear-fill'}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      ></i>
      <ul className="dropdown-menu">
        <li>
          <a className="dropdown-item" href="#">
            Share Project (Link)
          </a>
        </li>
        <li>
          <a className="dropdown-item bg-danger" href="#" data-bs-toggle="modal"
            data-bs-target={`#removeModal-${projId}`}>
            Delete Project
          </a>
        </li>
      </ul>
      <div
        className="modal fade"
        id={`removeModal-${projId}`}
        tabIndex={-1}
        aria-labelledby={`removeModalLabel-${projId}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Delete Project
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">Are you sure you want to delete this project?</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={DeleteProject}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectManageDropdown
