import axios from 'axios';

export default axios.create({
  baseURL: 'localhost:5001/api',
  headers: {
    Accept: '*/*',
    Connection: 'keep-alive',
  },
});
