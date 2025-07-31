import { useState } from "react";

function CommentList({ comments, onAddReply, onDelete }) {
  return (
    <section className="comment-list">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onAddReply={onAddReply}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

function CommentItem({ comment, onAddReply, onDelete }) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    onAddReply(comment.id, replyText);
    setShowReply(false);
    setReplyText("");
  };

  return (
    <div className="comment">
      <span>{comment.text}</span>
      <div className="comment-actions">
        <button
          className="comment-btn"
          onClick={() => setShowReply(!showReply)}
        >
          Reply
        </button>
        <button className="comment-btn" onClick={() => onDelete(comment.id)}>
          Delete
        </button>
      </div>

      {showReply && (
        <section className="reply-input">
          <textarea
            className="comment-text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply"
          />
          <button className="comment-btn" onClick={handleReply}>
            Reply
          </button>
        </section>
      )}

      {comment.children.length > 0 && (
        <CommentList
          comments={comment.children}
          onAddReply={onAddReply}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}

export { CommentList };
