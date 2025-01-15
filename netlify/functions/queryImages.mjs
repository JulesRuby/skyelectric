import { google } from 'googleapis';
// const { google } = require('googleapis');

// exports.handler = async () => {
export default async () => {
	console.log('HALLO');
	// const handler = async () => {
	try {
		// Parse service account credentials from environment variables
		// console.log(process.env.GOOGLE_SERVICE_ACCOUNT);
		const folderId = process.env.SKY_FOLDER_ID;
		const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

		// console.log(process.env.SKY_FOLDER_ID);
		// console.log(process.env.GOOGLE_SERVICE_ACCOUNT);
		// console.log(JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT));

		// Authenticate with Google API
		const auth = new google.auth.GoogleAuth({
			credentials: serviceAccount,
			scopes: ['https://www.googleapis.com/auth/drive.readonly'],
		});

		const drive = google.drive({ version: 'v3', auth });

		// Replace with your folder ID
		const response = await drive.files.list({
			q: `'${folderId}' in parents and mimeType contains 'image/'`,
			// fields: 'files',
			fields: 'files(id, name, imageMediaMetadata)',
		});

		// console.log(typeof response);
		// console.log(response);
		// // console.log({ response });
		// console.log(typeof response.data.files);
		// console.log(response.data.files);

		const files = response.data.files.map(
			({ id, name, imageMediaMetadata }) => {
				// console.log('imageMediaMetadata:\n', imageMediaMetadata);
				// console.log(imageMediaMetadata.time);
				// const dateTaken = imageMediaMetadata.time;
				// console.log(dateTaken);
				// const attributes = {
				// 	id: id,
				// 	name: name,
				// 	dateTaken: dateTaken,
				// };
				// return attributes;
				return {
					id: id,
					name: name,
					dateTaken: imageMediaMetadata.time,
					// url: `https://drive.google.com/uc?id=${file.id}`,
				};
			}
		);

		// console.log({ files });
		// console.log(typeof files);
		// console.log(JSON.stringify(files));
		// console.log('PRE RETURN');

		// return {
		// 	statusCode: 200,
		// 	body: JSON.stringify(files),
		// };

		const body = JSON.stringify(files);

		return new Response(body, { statusCode: 200 });
	} catch (error) {
		console.error('Error fetching images:', error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'Failed to fetch images' }),
		};
	}
};
