import axios from 'axios';

const fetchClosestPics = (lat, lng) => axios.get(`/api/closestPics?lat=${lat}&lng=${lng}`)

export default fetchClosestPics;