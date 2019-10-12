import React from 'react';
//import { Link } from 'react-router-dom';
import LostPetProfileListing from './lostpet/LostPetProfileListing';

const LostPetProfile = props => {
	return (
		<div>
			<LostPetProfileListing qrcode={props.match.params.qrcode} />
		</div>
	);
};

export default LostPetProfile;
