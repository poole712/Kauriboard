type Member = {
  id: number
  username: string
  email: string
  role: string
}

function ProjectMembers({ members }: { members: Member[] }) {
  return (
    <div className="d-flex flex-column col-4 m-3 ">
      <h5 className="align-self-center">Members:</h5>
      <ul className="align-self-center">
        {members.map(member => (
          <li key={member.id}>
            {member.username} ({member.role})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectMembers
