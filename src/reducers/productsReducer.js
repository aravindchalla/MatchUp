import * as actions from '../constants/productConstants';

const initialState = {
	products: [],
	searchResults: [],
};

const ProductReducers = (state = initialState, action) => {
	switch (action.type) {
		case actions.FETCH_POST_REQUEST:
			return {
				...action.payload,
			};
		case actions.GET_POST_REQUEST:
			return {
				...state,
			};
		case actions.SORT_POSTS_ASC:
			action.payload.sort(function(a, b){ return (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)});
			return [...action.payload]
		case actions.SORT_POSTS_DESC:
			action.payload.sort(function(a, b) {return (a.name < b.name ? 1 : a.name > b.name ? -1 : 0)});
			return [...action.payload]
		case actions.SEARCH_POSTS:
			return {
				...state,
				products: state.searchResults.filter((post) =>
					post.name.toLowerCase().includes(action.payload.toLowerCase())
				),
			};
		default:
			return state;
	}
};

export default ProductReducers;