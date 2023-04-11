import { useState } from 'react';
import MapContainer from './Mapcontainer';
import { Form, Button, InputGroup } from 'react-bootstrap';

const SearchPlace = () => {
	const [inputText, setInputText] = useState('');
	const [place, setPlace] = useState('');

	const onChange = (e) => {
		setInputText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setPlace(inputText);
		setInputText('');
	};

	return (
		<>
			<Form className='inputForm' onSubmit={handleSubmit}>
				<InputGroup>
					<Form.Control placeholder='검색어를 입력해주세요' onChange={onChange} value={inputText} />
					<Button variant='outline-secondary' type='submit'>
						검색
					</Button>
				</InputGroup>
			</Form>
			<MapContainer searchPlace={place} />
		</>
	);
};

export default SearchPlace;
