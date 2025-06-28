import FileList from "./FileList";

export default function FileExplorer({ data }) {
  return (
    <div className="container">
      <h1>File Explorer 1</h1>
      <ul>
        <FileList data={data} level={1} />
      </ul>
    </div>
  );
}
