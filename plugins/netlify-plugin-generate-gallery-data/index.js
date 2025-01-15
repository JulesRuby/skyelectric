import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

// const { google } = require('googleapis');
// const fs = require('fs');
// const path = require('path');
console.log(
	'\n---------------------------------------------------------------\n'
);
console.log('onPreBuild plugin');
console.log(
	'\n---------------------------------------------------------------\n'
);

export const onPreBuild = async ({ constants, utils }) => {
	// console.log('constants.IS_LOCAL', constants.IS_LOCAL);
	const isLocal = constants.IS_LOCAL;

	console.log('Fetching Google Drive metadata...');

	try {
		// console.log(process.env.SKY_FOLDER_ID);
		// console.log(process.env.GOOGLE_SERVICE_ACCOUNT);
		// console.log(JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT));
		const folderId = !isLocal
			? process.env.SKY_FOLDER_ID
			: process.env.LOCAL_SKY_FOLDER_ID;
		// const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
		const serviceAccount = !isLocal
			? process.env.GOOGLE_SERVICE_ACCOUNT
			: process.env.LOCAL_GOOGLE_SERVICE_ACCOUNT;

		const auth = new google.auth.GoogleAuth({
			credentials: JSON.parse(serviceAccount),
			scopes: ['https://www.googleapis.com/auth/drive.readonly'],
		});

		const drive = google.drive({ version: 'v3', auth });

		const response = await drive.files.list({
			q: `'${folderId}' in parents and mimeType contains 'image/'`,
			fields: 'files(id, name, imageMediaMetadata)',
		});

		const images = response.data.files.map(
			({ id, name, imageMediaMetadata }) => ({
				id: id,
				name: name,
				dateTaken: imageMediaMetadata.time,
			})
		);

		const outputPath = path.join(
			constants.PUBLISH_DIR,
			'galleryMetaData.json'
		);
		console.log({ outputPath });
		// return;
		fs.writeFileSync(outputPath, JSON.stringify(images, null, 2));
		console.log('Google Drive metadata saved to gallery.json');
	} catch (error) {
		console.error('Failed to fetch Google Drive metadata:', error);
	}
};
