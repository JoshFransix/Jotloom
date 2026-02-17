export const useNotesApi = () => {
  const { apiRequest } = useApi();

  const getAllNotes = async () => {
    return await apiRequest('/notes');
  };

  const getNote = async (id: string) => {
    return await apiRequest(`/notes/${id}`);
  };

  const createNote = async (title: string, content: string) => {
    return await apiRequest('/notes', {
      method: 'POST',
      body: { title, content },
    });
  };

  const updateNote = async (id: string, title: string, content: string) => {
    return await apiRequest(`/notes/${id}`, {
      method: 'PATCH',
      body: { title, content },
    });
  };

  const deleteNote = async (id: string) => {
    return await apiRequest(`/notes/${id}`, {
      method: 'DELETE',
    });
  };

  return {
    getAllNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote,
  };
};
