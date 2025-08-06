export const getCurrentPermohonanId = (formKey) => {
  try {
    const key = `id_permohonan_${formKey}`;
    const currentPermohonanId = localStorage.getItem(key);
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

export const setCurrentPermohonanId = (formKey, permohonanId) => {
  try {
    const key = `id_permohonan_${formKey}`;
    localStorage.setItem(key, JSON.stringify(permohonanId));
  } catch (error) {
    console.error("Error saving currentPermohonanId to localStorage:", error);
  }
};

export const removeCurrentPermohonanId = (userId) => {
  try {
    const key = `id_permohonan_${userId}`;
    localStorage.removeItem(key);
  } catch (error) {
    console.error(
      "Error removing currentPermohonanId from localStorage:",
      error
    );
  }
};
