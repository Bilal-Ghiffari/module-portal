// Enhanced getFileUrl function with better logging and null checks

export const getFileUrl = (files, fileType) => {
  if (!files || !Array.isArray(files) || files.length === 0) {
    // console.log(`No files available for type ${fileType}`);
    return null;
  }

  const matchingFiles = files
    .filter((f) => f.file_type === fileType)
    .sort((a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at));

  if (matchingFiles.length === 0) {
    // console.log(`No files found for type ${fileType}`);
    return null;
  }

  // console.log(
  //   `Found ${matchingFiles.length} files for type ${fileType}, using most recent`
  // );
  return matchingFiles[0]?.url || null;
};
