function Location() {
	let options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};

	function success(position) {
		//좌표를 알아낼 수 있는데, 여기서 알아낸 좌표를 kakaoAPI url에 사용할 것이다.
		// let locations = [0, 0];
		// locations = [position.coords.latitude, position.coords.longitude];
		// console.log(locations);
		console.log('위도 : ' + position.coords.latitude);
		console.log('경도: ' + position.coords.longitude);
	}

	function error(err) {
		console.warn('ERROR(' + err.code + '): ' + err.message);
	}

	return navigator.geolocation.getCurrentPosition(success, error, options);
}
export default Location;
