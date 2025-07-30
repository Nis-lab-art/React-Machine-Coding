import PostCard from "./PostCard";

export default function Container() {
  return (
    <div>
      <h1>Compound Pattern</h1>
      <PostCard
        post={{
          title: "Understanding the Compound Pattern in React",
          content:
            "This is a simple post to demonstrate the compound pattern in React.",
          author: "John Doe",
          date: "2023-10-01",
        }}
      >
        <PostCard.Title />
        <PostCard.Content />
        <PostCard.Meta />
      </PostCard>
    </div>
  );
}
