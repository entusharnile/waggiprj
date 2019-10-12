import { LOADING_ANIMATION } from '../actions/types';

export default function(state = [], action) {
	switch (action.type) {
		case LOADING_ANIMATION:
			return action.payload;
		default:
			return state;
	}
}
