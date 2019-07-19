import axios from "axios";

const baseUrl = "http://localhost:3001/people";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(res => res.data);
};

const create = person => {
  const request = axios.post(baseUrl, person);
  return request.then(res => res.data);
};

const deleteEntry = id => {
  const url = `${baseUrl}/${id}`;
  const request = axios.delete(url);
  return request.then(res => res);
};

export default { getAll, create, deleteEntry };
