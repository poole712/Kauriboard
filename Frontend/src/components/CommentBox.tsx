import { useEffect, useState } from 'react'
import { getcomments, postcomment } from '../services/authService'
import CommentContainer from './CommentContainer';

type Comment = {
  commentId: string
  message: string
  name: string
  createdAt: Date
  userId : number
}

function CommentBox({ taskId, hidden }: { taskId: string; hidden: boolean; }) {
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState<Comment[]>([])
  const [sendHovered, setSendHoevered] = useState(false)

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

  async function handleSendComment() {
    const response = await postcomment(newComment, taskId)
    getComments();
    console.log(response.data)
  }

  return (
    <>
      <div className="comment-box" hidden={!hidden}>
        {comments.map(c => (
          <CommentContainer key={c.commentId} comment={c} refresh={getComments}/>
        ))}
        <div className="d-flex ">
          <input
            className="new-comment"
            onPointerDown={e => e.stopPropagation()}
            onClick={e => e.stopPropagation()}
            onKeyDown={e => e.stopPropagation()}
            onKeyUp={e => e.stopPropagation()}
            type="text"
            placeholder="...new comment"
            onChange={e => setNewComment(e.target.value)}
          ></input>
          <div
            className="m-1"
            onPointerDown={e => {
              e.stopPropagation() // stops drag from starting
              e.preventDefault() // prevents dnd-kit from hijacking the click
            }}
            onMouseOver={() => setSendHoevered(true)}
            onMouseLeave={() => setSendHoevered(false)}
            onClick={handleSendComment}
          >
            <i
              data-no-drag
              className={sendHovered ? 'bi bi-send-fill' : 'bi bi-send'}
              style={{ fontSize: '20px', cursor: 'pointer' }}
            ></i>
          </div>
        </div>
      </div>
    </>
  )
}

export default CommentBox
