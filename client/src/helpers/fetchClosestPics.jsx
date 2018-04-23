import axios from 'axios';

// FETCHES all the pictures form the database
// TODO make this take in a location and fetch pictures sorted by location
const fetchClosestPics = (lat, lng) => axios.get(`/api/closestPics?lat=${lat}&lng=${lng}`)

export default fetchClosestPics;