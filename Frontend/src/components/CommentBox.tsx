import {  useState } from 'react'
import { postcomment } from '../services/authService'
import CommentContainer from './CommentContainer';
import { broadcastCommentPosted } from '../services/signalRService';

type Comment = {
  commentId: string
  message: string
  name: string
  createdAt: Date
  userId : number
}

function CommentBox({ taskId, hidden, comments }: { taskId: string; hidden: boolean; comments: Comment[]}) {
  const [newComment, setNewComment] = useState('')
  const [sendHovered, setSendHoevered] = useState(false)


  async function handleSendComment() {
    const response = await postcomment(newComment, taskId)
    console.log(response.data)
    broadcastCommentPosted("CommentPosted", newComment)
    setNewComment('')
  }

  return (
    <>
      <div className="comment-box" hidden={!hidden}>
        {comments.map(c => (
          <CommentContainer key={c.commentId} comment={c}/>
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
            value={newComment}
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
