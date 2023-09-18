export default (value) => {
  if (!value) {
    return;
  }

  const formData = new FormData();
  formData.append('image', value);

  return $api('/image/upload', {
    method: 'POST',
    body: formData
  })
}