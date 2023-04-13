import { useEffect, useState } from 'react';
import { Container, Badge } from 'react-bootstrap';
import './App.css';

const { kakao } = window;
const MapContainer = ({ searchPlace }) => {
	const [userPlace, setUserPlace] = useState([]);
	useEffect(() => {
		const container = document.getElementById('myMap');
		const options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 5,
		};
		const map = new kakao.maps.Map(container, options);

		const ps = new kakao.maps.services.Places();

		ps.keywordSearch(searchPlace, placesSearchCB);

		function placesSearchCB(data, status, pagination) {
			if (status === kakao.maps.services.Status.OK) {
				let bounds = new kakao.maps.LatLngBounds();
				for (let i = 0; i < data.length; i++) {
					displayMarker(data[i]);
					bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
				}
				map.setBounds(bounds);
				setUserPlace(data);
				console.log(data);
			}
		}
		function displayMarker(place) {
			let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
			let marker = new kakao.maps.Marker({
				map: map,
				position: new kakao.maps.LatLng(place.y, place.x),
			});
			// 마커에 마우스오버이벤트를 등록
			kakao.maps.event.addListener(marker, 'mouseover', function () {
				// 마커를 클릭하면 장소명이 인포윈도우에 표출
				infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
				infowindow.open(map, marker);
			});
			kakao.maps.event.addListener(marker, 'mouseout', function () {
				// 마커를 클릭하면 장소명이 인포윈도우에 표출
				infowindow.close();
			});
		}
	}, [searchPlace]);

	return (
		<>
			{userPlace.length > 0 ? (
				<SearchList userPlace={userPlace} />
			) : (
				<div
					style={{
						width: '30%',
						height: '800px',
						float: 'left',
					}}></div>
			)}
			<div
				id='myMap'
				style={{
					width: '70%',
					height: '800px',
					float: 'right',
				}}></div>
		</>
	);
};
function SearchList({ userPlace }) {
	return (
		<Container className='placeInfo-container'>
			{userPlace.map((place, index) => {
				return (
					<div className='placeInfo' key={index}>
						<h5>{place.place_name}</h5>
						<span></span>
					</div>
				);
			})}
		</Container>
	);
}
export default MapContainer;
