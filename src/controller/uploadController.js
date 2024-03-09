const cloudinary = require('cloudinary').v2;

// Function to upload an image to Cloudinary
exports.uploadImage = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const uploadedFile = req.files.image;
        const uploadFolder = req.headers.folder || 'My Folder';

        // Read the file into a buffer
        const fileBuffer = uploadedFile.data;

        // Upload options
        const options = { folder: uploadFolder };

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        // Upload the buffer to Cloudinary
        const result = await cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'Failed to upload image to Cloudinary.' });
            } else {
                // Image uploaded successfully
                res.json({ message: 'File uploaded to Cloudinary!', data: { url: result.secure_url, publicId: result.public_id } });
            }
        }).end(fileBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to delete an image from Cloudinary
exports.deleteImage = async (req, res) => {
    try {
        const { imageUrl } = req.body;

        // Extract the public ID from the image URL
        const publicId = extractPublicId(imageUrl);

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        // Delete the image from Cloudinary
        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result === 'ok') {
            res.json({ message: 'Image deleted successfully.' });
        } else if (result.result === 'not found') {
            res.status(404).json({ message: 'Image not found in Cloudinary.' });
        } else {
            res.status(400).json({ message: 'Failed to delete image.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Function to extract public ID from Cloudinary URL
const extractPublicId = (url) => {
    const parts = url.split("/");
    const publicIdParts = parts.slice(-2); // Exclude the version number and get the last two parts
    const publicId = publicIdParts.join("/");

    const id = publicId.split(".")

    return id[0];
};


