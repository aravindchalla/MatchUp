import * as actionTypes from '../constants/productConstants';

const initialState = {
	products: []
};

const ProductReducers = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_POST_REQUEST : return action.payload;
		case actionTypes.SORT_POSTS_ASC:
			action.payload.sort(function(a, b){ return (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)});
			return [...action.payload]
		case actionTypes.SORT_POSTS_DESC:
			action.payload.sort(function(a, b) {return (a.name < b.name ? 1 : a.name > b.name ? -1 : 0)});
			return [...action.payload]
/* 		case actionTypes.SEARCH_POSTS:
			return {
				...state,
				products: state.searchResults.filter((post) =>
					post.name.toLowerCase().includes(action.payload.toLowerCase())
				),
			}; */
		default:
			return state;
	}
};

export default ProductReducers;