import { useEffect, useState } from "react";

function FilePreview({ file }) {
  const [fileUrl, setFileUrl] = useState("");
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);

      // Cleanup saat unmount
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  if (!file) {
    return <p>No file selected</p>;
  }

  return (
    <div
      className="border rounded p-2 bg-white shadow-sm"
      style={{ width: "100%", height: "400px" }}
    >
      <iframe
        src={fileUrl}
        title="File Preview"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
}

export default FilePreview;
