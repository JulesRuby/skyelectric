import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
// dotenv for netlify dev scope
import dotenv from 'dotenv';
dotenv.config();

console.log(
	'\n---------------------------------------------------------------\n'
);
console.log('onPreBuild plugin');
console.log(
	'\n---------------------------------------------------------------\n'
);

export const onPreBuild = async ({ constants, utils }) => {
	const isLocal = constants.IS_LOCAL;

	console.log('Fetching Google Drive metadata...');

	try {

		const folderId = !isLocal
			? process.env.SKY_FOLDER_ID
			: process.env.LOCAL_SKY_FOLDER_ID;
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

		fs.writeFileSync(outputPath, JSON.stringify(images, null, 2));
		console.log('Google Drive metadata saved to gallery.json');

	} catch (error) {
		console.error('Failed to fetch Google Drive metadata:', error);
	}
};
