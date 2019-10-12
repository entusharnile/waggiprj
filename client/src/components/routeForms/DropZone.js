import React from "react";
import Dropzone from "react-dropzone";

const ReduxFormDropzone = field => {
	let { input, meta, dropzoneOnDrop, ...props } = field;

	return (
		<Dropzone
			accept="image/jpeg, image/png"
			onDrop={(acceptedFiles, rejectedFiles, e) => {
				field.input.onChange(acceptedFiles);
				field.dropzoneOnDrop &&
					field.dropzoneOnDrop(acceptedFiles, rejectedFiles, e);
			}}
			{...props}
		>
			<div>Upload image</div>
		</Dropzone>
	);
};

export default ReduxFormDropzone;
