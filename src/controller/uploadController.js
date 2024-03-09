const cloudinary = require('cloudinary').v2;

exports.uploadImage = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const uploadedFile = req.files.image;
        const uploadFolder = req.headers.folder;

        // Configuration for Cloudinary
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        // Read the file into a buffer
        const fileBuffer = uploadedFile.data;

        // Upload options
        const options = { folder: uploadFolder || 'My Folder' };

        // Upload the buffer to Cloudinary
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(options, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }).end(fileBuffer);
        });

        // You can save imageUrl to your database or use it as needed
        res.json({ message: 'File uploaded to Cloudinary!', data: result.secure_url });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
