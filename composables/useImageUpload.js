export default (value, type) => {
  if (!value) {
    return;
  }

  const formData = new FormData();
  formData.append('image', value);

  return $api(`/image/upload/${type}`, {
    method: 'POST',
    body: formData
  })
}