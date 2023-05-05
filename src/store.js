import { configureStore, createSlice } from '@reduxjs/toolkit';

const locationMenu = createSlice({
	name: 'locationMenu',
	initialState: {
		latitude: 0,
		longitude: 0,
		location: '성남시 수정구',
		menu: '콩나물 국밥',
	},
	reducers: {
		changeLocation(state, action) {
			state.location = action.payload;
		},
		changeLatitude(state, action) {
			state.latitude = action.payload;
		},
		changeLongitude(state, action) {
			state.longitude = action.payload;
		},
		changeMenu(state, action) {
			state.menu = action.payload;
		},
	},
});
export let { changeLocation, changeMenu, changeLatitude, changeLongitude } = locationMenu.actions;

export default configureStore({
	reducer: {
		locationMenu: locationMenu.reducer,
	},
});
