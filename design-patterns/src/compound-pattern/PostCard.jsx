import "./post.css";
import { createContext, useContext } from "react";

const PostContext = createContext({
  title: "",
  content: "",
  author: "",
  date: "",
});

// Simple hook to access the PostContext
function usePostCardContext() {
  const post = useContext(PostContext);
  return post;
}

export default function PostCard({ children, post }) {
  return (
    <PostContext.Provider value={post}>
      <div className="post-container">{children}</div>
    </PostContext.Provider>
  );
}

// Exporting subcomponents to allow for compound component usage
PostCard.Title = function PostCardTitle() {
  const { title } = usePostCardContext();
  return <h3>{title}</h3>;
};

PostCard.Content = function PostCardContent() {
  const { content } = usePostCardContext();
  return <p>{content}</p>;
};

PostCard.Meta = function PostCardMeta() {
  const { author, date } = usePostCardContext();
  return (
    <div className="post-meta">
      <span className="post-author">{author}</span>
      <span className="post-date">{date}</span>
    </div>
  );
};
