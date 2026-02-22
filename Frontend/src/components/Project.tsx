import { useEffect, useState } from 'react'
import { getprojectmembers } from '../services/authService'
import "../index.css";
import { useNavigate } from 'react-router';
import ProjectManageDropdown from './ProjectManage';

function Project({ id, name, description }: { id: number; name: string; description: string }) {

  const [members, setMembers] = useState([])
  const [showManage, setShowManage] = useState(false)

  const navigate = useNavigate();

  function hovering(hovered: boolean, event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (hovered) {
      setShowManage(true)
      event.currentTarget.classList.add('projectHovered')
    } else {
      setShowManage(false)
      event.currentTarget.classList.remove('projectHovered')
    }
  }

  useEffect(() => {
    async function loadMembers() {
      const response = await getprojectmembers(id)
      if (response.ok) {
        console.log(response.data)
        setMembers(response.data)
      } else {
        console.error(response.error || 'Error getting project members.')
      }
    }
    loadMembers()
  }, [id])

  type Member = {
    id: number
    username: string
    role: string
  }

  return (
    <div className="card" onMouseEnter={e => hovering(true, e)} onMouseLeave={e => hovering(false, e)}>
      <div className="d-flex flex-row col-12 ">
        <div className="p-2 col-6" key={id}>
          <h3 className="mx-2 d-flex">{name}</h3>
          <p className="mx-2 text-start col-5 d-flex">{description}</p>
        </div>
        <button
          style={{ visibility: showManage ? 'visible' : 'hidden', height: '40px', alignSelf: 'center' }}
          className="btn btn-secondary col-2 mx-3" onClick={() => navigate(`/pages/projectmanagepage/${id}`)}>Manage</button>
        <div className="p-2 col-3">
          <h5 className="mx-2 d-flex">Members</h5>
          <div className="mx-2 d-flex">
            {members.length > 0 ? (
              <ul>
                {members.map((member: Member) => (
                  <li key={member.id}>
                    {member.username} ({member.role})
                  </li>
                ))}
              </ul>
            ) : (
              'No members found.'
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project
