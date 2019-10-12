import { FETCH_SUBSCRIPTIONPLANS } from "../actions/types";
export default function(state = false, action) {
	switch (action.type) {
		case FETCH_SUBSCRIPTIONPLANS: {
			return action.payload || false;
		}
		default:
			return state;
	}
}
