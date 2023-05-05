import { useEffect, useState } from 'react';
import './App.css';
import { useSelector } from 'react-redux';
const { kakao } = window;

const MapContainer = ({ searched, setPlaceList }) => {
	const store = useSelector((state) => state);
	useEffect(() => {
		const container = document.getElementById('myMap');
		const options = {
			center: new kakao.maps.LatLng(store.locationMenu.latitude, store.locationMenu.longitude),
			level: 3,
		};
		const map = new kakao.maps.Map(container, options);

		const ps = new kakao.maps.services.Places();

		ps.keywordSearch(`${store.locationMenu.location} + ${store.locationMenu.menu}`, placesSearchCB);

		function placesSearchCB(data, status, pagination) {
			if (status === kakao.maps.services.Status.OK) {
				let bounds = new kakao.maps.LatLngBounds();
				for (let i = 0; i < data.length; i++) {
					displayMarker(data[i]);
					bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
				}
				map.setBounds(bounds);
				setPlaceList(data);
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
	}, [searched]);

	return (
		<div
			id='myMap'
			style={{
				width: '70%',
				height: '100vh',
				float: 'right',
			}}></div>
	);
};
export default MapContainer;
