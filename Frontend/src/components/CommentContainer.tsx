import { useEffect, useState } from 'react'
import { deletecomment, getcurrentuser } from '../services/authService'
import { broadcastCommentDeleted } from '../services/signalRService'

type Comment = {
  commentId: string
  name: string
  createdAt: Date
  message: string
  userId : number
}

type Member = {
  id: number
  username: string
  email: string
  role: string
}

function CommentContainer({ comment }: { comment: Comment }) {
  const [deleteHovered, setDeleteHovered] = useState(false)
  const [currentUser, setCurrentUser] = useState<Member | null>(null)

  async function handleDelete() {
    const response = await deletecomment(comment.commentId)
    broadcastCommentDeleted("CommentDeleted", comment)
    console.log(response)
  }

  useEffect(() => {
    async function checkOwnership() {
      const response = await getcurrentuser()
      if (response.ok) {
        setCurrentUser(response.data)
      } else {
        console.log('Failed to get current user:', response.error)
      }
    }
    checkOwnership()
  }, [])

  return (
    <div className="comment" key={comment.commentId}>
      <div className="d-flex flex-column justify-content-start">
        <p className="mx-1 m-0 text-success">{comment.name}:</p>
        <p className="comment-date">{new Date(comment.createdAt).toLocaleDateString()}</p>
      </div>
      <p className="comment-message">{comment.message}</p> 
      <div
        hidden={currentUser?.id != comment.userId}
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
          style={{ fontSize: '20px', cursor: 'pointer' }}
        ></i>
      </div>
    </div>
  )
}

export default CommentContainer
