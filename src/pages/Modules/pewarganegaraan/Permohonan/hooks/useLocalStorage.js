export const getCurrentPermohonanId = () => {
  try {
    const currentPermohonanId = localStorage.getItem(
      "id_permohonan_pewarganegaraan"
    );
    if (currentPermohonanId) {
      return JSON.parse(currentPermohonanId);
    }
    return null;
  } catch (error) {
    console.error(
      "Error retrieving currentPermohonanId from localStorage:",
      error
    );
    return null;
  }
};
