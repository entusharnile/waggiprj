import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

class FileUpload extends Component {
	onDrop = files => {
		const formData = new FormData();
		formData.append('theseNamesMustMatch', files[0]);
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};
		axios.post('/api/upload', formData, config).then(res => {
			console.log(res);
		});
	};

	render() {
		return (
			<Dropzone onDrop={this.onDrop} multiple={false}>
				<div style={{ marginTop: 400 }}>Profile Picture</div>
			</Dropzone>
		);
	}
}

export default FileUpload;
