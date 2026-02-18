import { removemember } from "../services/authService"

type Member = {
  id: number
  username: string
  email: string
  role: string
}


function Member({ member, currentUser, ownerId, projId, refresh }: { member: Member; currentUser : Member, ownerId?: number; projId : number, refresh : () => void }) {

    async function RemoveMember() {
        const response = await removemember(projId.toString(), member.id.toString())
        if(response.ok) {
            console.log('Removed member successfully')
            refresh();
        } else {
            console.log(response.message);
        }
    }

    if(projId == null) {
        return <div>
            Loading...
        </div>
    }

  return (
    <>
      <div className="member card">
        <h5 className="card-title m-1 fs-6">{member.username}</h5>
        <p className="card-text m-1">{ownerId == member.id ? 'Owner' : 'Member'}</p>
        {currentUser.id === ownerId && member.id !== ownerId && (
        <button
            className="btn btn-danger m-1 ms-auto"
            data-bs-toggle="modal"
            data-bs-target={`#removeModal-${member.id}`}
        >
            Remove
        </button>
        )}
      </div>

      <div
        className="modal fade"
        id={`removeModal-${member.id}`}
        tabIndex={-1}
        aria-labelledby={`removeModalLabel-${member.id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Remove Member
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">Are you sure you want to remove {member.username}?</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={RemoveMember}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Member
