import { useState, useEffect } from 'react'
import CommentBox from './CommentBox'
import { getcomments } from '../services/authService'

type Comment = {
  commentId: string
  message: string
  name: string
  createdAt: Date
  userId: number
}

function CommentButton({ taskId }: { taskId: string }) {
  const [commentHovered, setCommentHovered] = useState(false)
  const [isCommenting, setIsCommenting] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])

  async function getComments() {
    const response = await getcomments(taskId)
    if (response.ok) {
      setComments(response.data)
    } else {
      console.log(response.error)
    }
  }

  useEffect(() => {
    async function getComments() {
      const response = await getcomments(taskId)
      if (response.ok) {
        setComments(response.data)
      } else {
        console.log(response.error)
      }
    }
    getComments()
  }, [taskId])

  return (
    <div>
      <div>
        <div
          className="dropdown float-end ms-auto mx-1"
          onPointerDown={e => {
            e.stopPropagation() // stops drag from starting
            e.preventDefault() // prevents dnd-kit from hijacking the click
          }}
          onMouseOver={() => setCommentHovered(true)}
          onMouseLeave={() => setCommentHovered(false)}
          onClick={() => setIsCommenting(!isCommenting)}
        >
          <i
            data-no-drag
            className={commentHovered ? 'bi bi-chat-left-dots-fill' : 'bi bi-chat-left-dots'}
            style={{ fontSize: '15px', cursor: 'pointer' }}
          ></i>
        </div>
        <p className="float-end mx-1">{comments.length}</p>
      </div>

      <div hidden={!isCommenting}>
        <CommentBox taskId={taskId} hidden={isCommenting} comments={comments} refresh={getComments} />
      </div>
    </div>
  )
}

export default CommentButton
