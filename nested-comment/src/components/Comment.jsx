import { useState } from "react";
import { CommentList } from "./CommentComponents";

export default function Comment() {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  const handleAddComment = () => {
    if (!text.trim()) return;
    const newComment = {
      id: Date.now().toString(),
      text: text.trim(),
      children: [],
    };
    setComments([...comments, newComment]);
    setText("");
  };

  const handleReply = (parentId, replyText) => {
    if (!replyText.trim()) return;
    const newReply = {
      id: Date.now().toString(),
      text: replyText.trim(),
      children: [],
    };
    setComments(addReply(comments, parentId, newReply));
  };

  function addReply(list, parentId, reply) {
    return list.map((comment) => {
      if (comment.id === parentId) {
        return { ...comment, children: [...comment.children, reply] };
      }
      if (comment.children.length) {
        return {
          ...comment,
          children: addReply(comment.children, parentId, reply),
        };
      }
      return comment;
    });
  }

  const handleDelete = (idToDelete) => {
    setComments(deleteComment(comments, idToDelete));
  };

  function deleteComment(list, idToDelete) {
    return list
      .filter((c) => c.id !== idToDelete)
      .map((c) => ({ ...c, children: deleteComment(c.children, idToDelete) }));
  }

  return (
    <main className="comment-container">
      <section className="comment-input">
        <textarea
          className="comment-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment"
        />
        <button className="comment-btn" onClick={handleAddComment}>
          Comment
        </button>
      </section>
      <CommentList
        comments={comments}
        onAddReply={handleReply}
        onDelete={handleDelete}
      />
    </main>
  );
}
