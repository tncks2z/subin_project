import { useState } from 'react';
import MapContainer from './Mapcontainer';
import { Form, Button, InputGroup, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { changeMenu } from './store';

function SearchResult() {
	const [searched, setSearched] = useState('');
	const [placeList, setPlaceList] = useState([]);
	return (
		<>
			<Searchlist setSearched={setSearched} placeList={placeList}></Searchlist>
			<MapContainer searched={searched} setPlaceList={setPlaceList} />
		</>
	);
}

function SearchPlace({ setSearched }) {
	const store = useSelector((state) => state);
	const [inputText, setInputText] = useState(store.locationMenu.menu);
	const dispatch = useDispatch();
	function onChange(e) {
		setInputText(e.target.value);
	}
	function handleSubmit(e) {
		e.preventDefault();
		setSearched(inputText);
		setInputText(inputText);
		dispatch(changeMenu(inputText));
	}
	return (
		<Form className='inputForm' onSubmit={handleSubmit}>
			<InputGroup>
				<Form.Control placeholder='검색어를 입력해주세요' onChange={onChange} value={inputText} />
				<Button variant='outline-secondary' type='submit'>
					검색
				</Button>
			</InputGroup>
		</Form>
	);
}
function Searchlist({ placeList, setSearched }) {
	return (
		<div className='placeInfo-container'>
			<SearchPlace setSearched={setSearched}></SearchPlace>
			<div>
				{placeList.map((place, index) => {
					return (
						<div className='placeInfo' key={index}>
							<h6>{place.place_name}</h6>
							{place.phone ? <span>전화번호 : {place.phone}</span> : null}
							{place.phone ? <br /> : null}
							<span>주소 : {place.road_address_name}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
export default SearchResult;
