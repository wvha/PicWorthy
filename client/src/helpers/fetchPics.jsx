import axios from 'axios';

// FETCHES all the pictures form the database
// TODO make this take in a location and fetch pictures sorted by location
const fetchAllPics = () => {
  event.preventDefault();
  console.log('displaying!');
  axios.get(`/upload`)
    .then(res => {
      console.log(res.data);
  })
}

export default fetchAllPics;