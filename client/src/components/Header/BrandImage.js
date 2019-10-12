import React from 'react';
import BrandImage from '../../images/brand-logo.png';

const BrandLogo = () => {
	return (
		<div className="brand-logo-header">
			<img src={BrandImage} alt="WAGGI"/>
		</div>
	);
};

export default BrandLogo;