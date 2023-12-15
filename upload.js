require('dotenv').config()
const cloudinary = require('cloudinary').v2;
const pLimit = require('p-limit');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const images = [
  './images/jasa-hias-halaman.jpg',
  './images/jasa-pasang-plafon.jpg',
  './images/jasa-pemansangan-pintu.jpg',
  './images/jasa-pemasangan-keramik.jpg',
  './images/jasa-pemasangan-service-ac.jpg',
  './images/jasa-pembuatan-taman.jpg',
  './images/jasa-pengecetan-dinding.jpg',
  './images/jasa-perbaiki-keramik.jpg',
  './images/jasa-perbaiki-pipa-air.jpg',
  './images/jasa-renovasi-rumah.jpg'
];


(async function run() {

  const limit = pLimit(2);

  const imagesToUpload = images.map((image) => {
    return limit(async () => {
      const result = await cloudinary.uploader.upload(image);
      console.log(`Successfully uploaded ${image}`);
      console.log(`> Result: ${result.secure_url}`);
      return result;
    })
  });

  await Promise.all(imagesToUpload);
})();