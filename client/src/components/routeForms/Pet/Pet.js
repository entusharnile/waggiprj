import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../../FormElements/RenderField';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions';
import { checkLoading } from '../helpers';
import ReduxFormDropzone from '../DropZone';
import RenderDatePicker from '../../FormElements/RenderDatePicker';
import PawLogo from '../../Misc/PawLogo';

import { AWSBaseUrl } from '../../../utils/constants';

const renderError = ({ meta: { touched, error } }) =>
	touched && error ? <span>{error}</span> : false;

let Pet = props => {
	const {
		handleSubmit,
		handlePetSubmit,
		className,
		history,
		loading,
		petImageUrl
	} = props;

	return (
		<div className="pet-page">
			<div className={className ? className : 'is-fullwidth'}>
				<PawLogo />
				{className ? <h1>Pet</h1> : false}
				<form
					onSubmit={handleSubmit(values => {
						handlePetSubmit(values, history);
					})}
				>
					<div className="form-details">
						<div className="columns">
							<div className="column pet-image">
								{petImageUrl && <img src={`${AWSBaseUrl}/${petImageUrl}`} alt="Pet" />}
							</div>
						</div>
						<div className="columns">
							<Field name="petName" type="text" component={RenderField} label="petName" />
							<Field name="petCity" type="text" component={RenderField} label="petCity" />
						</div>
						<div className="columns">
							<div className="column">
								<Field name="petBreed" component="select" value="#ff0000">
									<option default>Select your Breed</option>
									<option value="#ff0000">Red</option>
									<option value="#00ff00">Green</option>
									<option value="#0000ff">Blue</option>
								</Field>
							</div>
							<Field
								name="rabiesTag"
								type="text"
								component={RenderField}
								label="Rabies Tag"
							/>
						</div>
						<div className="columns">
							<Field
								name="petBirthDay"
								component={RenderDatePicker}
								label="Pet birthday"
							/>
							<Field
								name="microchipId"
								type="text"
								component={RenderField}
								label="microchip ID 12039123"
							/>
						</div>
						<div className="columns">
							<Field
								name="petLicense"
								type="text"
								component={RenderField}
								label="License Pet"
							/>
							<Field
								name="petWeight"
								type="text"
								component={RenderField}
								label="petWeight"
							/>
						</div>
						<div className="control form-pet-gender column is-12">
							<div className="column is-12">
								<label>Gender</label>
							</div>
							<label className="radio">
								<Field name="petGender" component="input" type="radio" value="male" />{' '}
								Male
							</label>
							<label className="radio">
								<Field name="petGender" component="input" type="radio" value="female" />{' '}
								Female
							</label>
							<Field name="petGender" component={renderError} />
						</div>
						<div className="pet-desc">
							<Field
								name="petDescription"
								type="text"
								component={RenderField}
								label="petDescription"
							/>
						</div>
						<div className="dropzone">
							<Field
								name={'petImage'}
								component={ReduxFormDropzone}
								multiple={false}
								className="load-file-image"
							/>
						</div>
						<div className="column is-12 has-text-centered">
							<button
								type="submit"
								className={`button is-primary ${checkLoading(loading)}`}
							>
								Save
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

Pet = reduxForm({
	form: 'Pet',
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true
})(Pet);

function mapStateToProps({ profile, loading }) {
	if (profile.user) {
		return {
			initialValues: {
				petName: profile.pet[0].name,
				petGender: profile.pet[0].gender,
				petBirthDay: profile.pet[0].birthday,
				petWeight: profile.pet[0].weight,
				petCity: profile.pet[0].city,
				petBreed: profile.pet[0].breed,
				petLicense: profile.pet[0].license,
				petDescription: profile.pet[0].desc,
				microchipId: profile.pet[0].mchipId,
				rabiesTag: profile.pet[0].rabiesTag
			},
			petImageUrl: profile.pet[0].imgUrl,
			loading: loading
		};
	}
	return { loading: loading };
}

export default connect(mapStateToProps, actions)(withRouter(Pet));
