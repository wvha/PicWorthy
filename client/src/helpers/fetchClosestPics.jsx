import axios from 'axios';

// FETCHES all the pictures form the database
// TODO make this take in a location and fetch pictures sorted by location
const fetchClosestPics = ({lat, lng}) => {
  //event.preventDefault();
  console.log('displaying!');
  axios.get(`/api/closestPics?lat=${lat}&lng=${lng}`)
    .then(res => {
      console.log(res.data);
  })
}

export default fetchClosestPics;