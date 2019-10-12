import { PAGE_LOADING } from '../actions/types';

export default function(state = false, action) {
	switch (action.type) {
		case PAGE_LOADING:
			return action.payload;
		default:
			return state;
	}
}
