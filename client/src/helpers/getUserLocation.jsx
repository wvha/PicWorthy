const getUserLocation = () => {
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

