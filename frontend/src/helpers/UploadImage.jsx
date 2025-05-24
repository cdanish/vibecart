const url = `https://api.cloudinary.com/v1_1/drdu9pkl7/image/upload`;

const UploadImage = async (image) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'mern_product'); // Make sure this preset exists in Cloudinary

  const dataResponse = await fetch(url, {
    method: 'POST',
    body: formData,
  });



  return dataResponse.json(); 
};

export default UploadImage;
