import { useState } from "react";

export function ImageForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    if (file) formData.append("file", file);

    // send file to server
    try {
      const response = await fetch("@/app/create/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("upload success");
        setUploadStatus("upload success");
      }
    } catch (error) {
      console.error("upload failed", error);
      setUploadStatus("upload unsuccessful");
    }
  }
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFile} />
        <button type="submit">submit</button>
      </form>
      {uploadStatus && <p>uploadStatus</p>}
    </>
  );
}
