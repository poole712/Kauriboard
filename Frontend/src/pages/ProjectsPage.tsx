import { useEffect, useState } from 'react'
import { getprojects } from '../services/authService'
import Project from '../components/Project'
import { useNavigate } from 'react-router'

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  type Project = {
    id: number
    name: string
    description: string
  }

  useEffect(() => {
    async function loadProjects() {
      const response = await getprojects()

      if (response.ok) {
        setProjects(response.data)
      } else {
        if(response.status === 401) {
          navigate('/pages/Login')
          return
        }
        setError(`Error getting projects: ${response.error}`)
      }
      setLoading(false)
    }
    loadProjects()
  }, [])

  return (
    <div className="container mt-3 vh-100">
      <div className='d-flex flex-row p-3 justify-content-between align-items-center'>
        <h1>My Projects</h1>
        <button className="btn btn-primary m-3" onClick={() => navigate('/pages/CreateProject')}>
          Create Project
        </button>
      </div>
      <p hidden={!loading}>Loading...</p>
      <div className="m-3 bg-secondary p-3 rounded rounded-1">
        {projects.map(project => (
          <Project key={project.id} id={project.id} name={project.name} description={project.description} />
        ))}
      </div>
      <p className="text-danger">{error}</p>
    </div>
  )
}
export default ProjectsPage
