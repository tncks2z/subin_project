import { configureStore, createSlice } from '@reduxjs/toolkit';

const searchResult = createSlice({
	name: 'searchResult',
	initialState: {
		location: '성남시 수정구',
		menu: '콩나물 국밥',
	},
	reducers: {
		changeLocation(state, action) {
			state.location = action.payload;
		},
		changeMenu(state, action) {
			state.menu = action.payload;
		},
	},
});
export let { changeLocation, changeMenu } = searchResult.actions;

export default configureStore({
	reducer: {
		searchResult: searchResult.reducer,
	},
});
