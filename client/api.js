/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-undef */
const api = {
  create: (contact) =>
    fetch('/api/contact_create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    }),
  get: () => fetch('/api/all_contacts'),
  delete: (id) => fetch(`/api//del_conact/${id}`, { method: 'DELETE' }),
  edit: (id, data) =>
    fetch(`/api/edit_contact/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }),
};
export default api;
