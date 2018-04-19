// this helps us scrape fake use photos using the googleplaces api
const axios = require('axios');
const _ = require('lodash'); // lodash is like underscore

const GOOGLE_API_KEY =  'AIzaSyAbKOk8mgD80PTew_Lum8blZMT5WBP5NzA';

const photoEndpoint = (photoReference) => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`;

const placeEndpoint = (lat, lng) => `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=15000&key=${GOOGLE_API_KEY}`;

const searchPlace = (lat, lng) => axios.get(placeEndpoint(lat, lng));

const parsePlaces = (response) => {
  const results = response.data.results;

  const photos = _.flatten(results.map(result => result.photos));

  return photos
    .map(photo => photo.photo_reference)
    .map(photo => photoEndpoint(photo))
};

const getPhotos = (lat, lng) => {
  return searchPlace(lat, lng)
    .then((response) => parsePlaces(response))
    .then((parsedPlaces) => console.log(parsedPlaces));
};

getPhotos(-34, 151)

