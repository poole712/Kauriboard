import { useEffect, useState } from 'react'
import { getcomments } from '../services/authService'

type Comment = {
  commentId: string
  message: string
  name: string
  createdAt: Date
}

function CommentBox({ taskId, hidden}: { taskId: string, hidden : boolean }) {
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState<Comment[]>([])
  const [sendHovered, setSendHoevered] = useState(false)

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

  function handleSendComment() {
    
  }

  return (
    <>
      <div className="comment-box" hidden={!hidden}>
        {comments.map(c => (
          <div className="comment" key={c.commentId}>
            <div className="d-flex flex-column justify-content-start">
              <p className="mx-1 m-0 text-success">{c.name}:</p>
              <p className="comment-date">{new Date(c.createdAt).toLocaleDateString()}</p>
            </div>
            <p className="comment-message">{c.message}</p>
          </div>
        ))}
        <div className='d-flex '>
          <input
            className="new-comment"
            onPointerDown={e => {
                  e.stopPropagation() // stops drag from starting
                }}
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
