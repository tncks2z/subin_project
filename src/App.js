import { Button, Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import './App.css';
import SearchPlace from './Searchplace';
import { changeLocation, changeMenu } from './store';
import { useDispatch } from 'react-redux';
const { kakao } = window;
function App() {
	const dispatch = useDispatch();
	const menu1 = ['육식', '육식+채식'];
	const menu2 = ['전체', '식사', '요리'];
	const menu3 = ['전체', '한식', '중식', '일식', '양식', '그외'];
	const [userPick1, setUserPick1] = useState('');
	const [userPick2, setUserPick2] = useState('');
	const [userPick3, setUserPick3] = useState('');
	const [isPicked, setIsPicked] = useState(false);
	const [state, setState] = useState({
		center: {
			lat: 37.483034,
			lng: 126.902435,
		},
	});

	useEffect(() => {
		if (navigator.geolocation) {
			// GeoLocation을 이용해서 접속 위치를 얻어옵니다
			navigator.geolocation.getCurrentPosition((position) => {
				setState({
					center: {
						lat: position.coords.latitude, // 위도
						lng: position.coords.longitude, // 경도;
					},
				});
			});
		}
		getAddr(state.center.lat, state.center.lng);
	}, [state.center.lat, state.center.lng]);
	function getAddr(lat, lng) {
		// 주소-좌표 변환 객체를 생성합니다
		let geocoder = new kakao.maps.services.Geocoder();

		let coord = new kakao.maps.LatLng(lat, lng);
		let callback = function (result, status) {
			if (status === kakao.maps.services.Status.OK) {
				const arr = { ...result };
				const _arr = arr[0].address.region_2depth_name;
				dispatch(changeLocation(_arr));
			}
		};
		geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
	}
	const showMenu = () => {
		if (userPick1 !== '' && userPick2 !== '' && userPick3 !== '') {
			setIsPicked(true);
			// localStorage.setItem('userMenu', userMenu);
			dispatch(changeMenu(userMenu));
		} else {
			alert('메뉴를 선택해주세요');
		}
	};
	const navigate = useNavigate();
	const userMenu = '콩나물 국밥';
	return (
		<div className='App'>
			<Routes>
				<Route
					path='/'
					element={
						<Container className='text-center mt-5'>
							<h1>식사메뉴 랜덤 추천</h1>
							<h3>오늘 뭐 먹지? 점심 뭐 먹지? 저녁 뭐 먹지?</h3>
							<div className='user-pick-list'>
								<Menu1 menu1={menu1} setUserPick1={setUserPick1}></Menu1>
							</div>
							<div className='user-pick-list'>
								<Menu2 menu2={menu2} setUserPick2={setUserPick2}></Menu2>
							</div>
							<div className='user-pick-list'>
								<Menu3 menu3={menu3} setUserPick3={setUserPick3}></Menu3>
							</div>
							<Button onClick={showMenu}>메뉴를 골라줘!</Button>
							{isPicked ? (
								<div className='result' onClick={() => navigate('/map')}>
									<h2>{userMenu}</h2>
								</div>
							) : null}
						</Container>
					}></Route>
				<Route path='/map' element={<SearchPlace />}></Route>
			</Routes>
		</div>
	);
}

function Menu1(props) {
	const [btnActive, setBtnActive] = useState('');
	const btnClick = (e) => {
		props.setUserPick1(e.target.value);
		setBtnActive(() => {
			return e.target.value;
		});
	};
	return (
		<Row className='buttons'>
			{props.menu1.map((menu, index) => {
				return (
					<Col key={index} className='p-1'>
						<Button value={menu} className={`w-100 button-pick ${menu === btnActive ? 'active' : null}`} onClick={btnClick}>
							{menu}
						</Button>
					</Col>
				);
			})}
		</Row>
	);
}

function Menu2(props) {
	const [btnActive, setBtnActive] = useState('');
	const btnClick = (e) => {
		props.setUserPick2(e.target.value);
		setBtnActive(() => {
			return e.target.value;
		});
	};
	return (
		<Row className='buttons'>
			{props.menu2.map((menu, index) => {
				return (
					<Col key={index} className='p-1'>
						<Button value={menu} className={`w-100 button-pick ${menu === btnActive ? 'active' : null}`} onClick={btnClick}>
							{menu}
						</Button>
					</Col>
				);
			})}
		</Row>
	);
}

function Menu3(props) {
	const [btnActive, setBtnActive] = useState('');
	const btnClick = (e) => {
		props.setUserPick3(e.target.value);
		setBtnActive(() => {
			return e.target.value;
		});
	};
	return (
		<Row className='buttons'>
			{props.menu3.map((menu, index) => {
				return (
					<Col key={index} className='p-1'>
						<Button value={menu} className={`w-100 button-pick ${menu === btnActive ? 'active' : null}`} onClick={btnClick}>
							{menu}
						</Button>
					</Col>
				);
			})}
		</Row>
	);
}

export default App;
