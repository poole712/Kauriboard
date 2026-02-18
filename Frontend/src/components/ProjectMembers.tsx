import { getcurrentuser, inviteuser } from "../services/authService"
import { useEffect, useState } from "react"
import Member from "./Member"



type Project = {
  id: number
  name: string
  description: string
  createdByUserId: number
}

async function SendInvite(email: string, projectId: string) {
  const response = await inviteuser(email, projectId)
  if (response.ok) {
    console.log('Invite sent successfully')
  } else {
    console.log('Failed to send invite:', response.error)
  }
}

function ProjectMembers({ members, project, refresh }: { members: Member[], project: Project, refresh: () => void }) {

  const [email, setEmail] = useState('')
  const [currentUser, setCurrentUser] = useState<Member | null>(null)

  useEffect(() => {
    async function checkOwnership() {
      const response = await getcurrentuser();
      if (response.ok) {
        console.log("Current user:", response.data);
        setCurrentUser(response.data);
      } else {
        console.log("Failed to get current user:", response.error);
      }
    }
    checkOwnership();
  }, [refresh])

  if(!project) {
    return <div>Loading...</div>
  }

  return (
    <div className="d-flex flex-column col-4 m-3 bg-light rounded rounded-3 p-3 mx-auto">
      <h5 className="align-self-start">Members:</h5>
      <ul className="d-flex flex-column list-unstyled">
        {members.map(member => (
          <Member key={member.id} member={member} currentUser={currentUser!} ownerId={project.createdByUserId} refresh={refresh} projId={project.id}/>
        ))}
      </ul>
      <div className="align-self-end">
        <button
          hidden={currentUser?.id !== project.createdByUserId}
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever="@mdo"
        >
          Invite Member
        </button>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="newMemberModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="newMemberModal">
                New Member Invitation
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 text-start">
                  <label htmlFor="recipient-email" className="col-form-label">
                    Email:
                  </label>
                  <input type="text" className="form-control" id="recipient-email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={() => SendInvite(email, project.id.toString())} data-bs-dismiss="modal">
                Send Invite
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectMembers
