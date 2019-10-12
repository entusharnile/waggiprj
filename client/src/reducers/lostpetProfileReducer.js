import { FETCH_LOSTPETPROFILE } from "../actions/types";

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_LOSTPETPROFILE:
			return action.payload;
		default:
			return state;
	}
}
