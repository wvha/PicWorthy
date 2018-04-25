/*
 * Attempts to get the user location with high accuracy
 * then it attempts with low acuracy
 * if it can't get it in 5 seconds it gives up
 * it often doesn't work but when it does it's magical!
 * 
 * It is what causes that "this website wants your location" pop up
 * 
 */


const getUserLocation = function() {
  const onSuccess = ({coords}) => {
    this.setState({
      position: {
        lat: coords.latitude, 
        lng: coords.longitude
      },
      zoom: 10
    });
  };

  const onError = (err) => {
    navigator.geolocation.getCurrentPosition(
      onSuccess, 
      (err2) => console.log('error getting location', err2), 
      {maximumAge: 3600000, timeout: 5000, enableHighAccuracy: false} 
    );
  };

  navigator.geolocation.getCurrentPosition(
    onSuccess, 
    onError, 
    {maximumAge: 3600000, timeout: 5000, enableHighAccuracy: true} 
  );
};

export default getUserLocation;

