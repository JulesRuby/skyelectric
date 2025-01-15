import { google } from 'googleapis';

export default async () => {
	try {
		// Parse service account credentials from environment variables
		const folderId = process.env.SKY_FOLDER_ID;
		const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

		// Authenticate with Google API
		const auth = new google.auth.GoogleAuth({
			credentials: serviceAccount,
			scopes: ['https://www.googleapis.com/auth/drive.readonly'],
		});

		const drive = google.drive({ version: 'v3', auth });

		const response = await drive.files.list({
			q: `'${folderId}' in parents and mimeType contains 'image/'`,
			fields: 'files(id, name, imageMediaMetadata)',
		});

		const files = response.data.files.map(
			({ id, name, imageMediaMetadata }) => {

				return {
					id: id,
					name: name,
					dateTaken: imageMediaMetadata.time,
				};
			}
		);

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
