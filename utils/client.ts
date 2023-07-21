const uploadFiles = async (
  publicUploadApiKey: string,
  publicUploadUrl: string, 
  inputFiles: File[], 
  createSignature: () => Promise<{ timestamp: number, signature: string }>
): Promise<Response[]> => {
  let uploadRequests: Promise<Response>[] = [];
  if (inputFiles.length > 0) {
    const { timestamp, signature } = await createSignature();
    for (const file of inputFiles) {
      let cloudinaryFormData = new FormData();
      cloudinaryFormData.append('api_key', publicUploadApiKey);
      cloudinaryFormData.append('signature', signature);
      cloudinaryFormData.append('timestamp', String(timestamp));
      cloudinaryFormData.append('folder', 'farm-site');
      cloudinaryFormData.append('file', file);
      uploadRequests.push(
        fetch(publicUploadUrl, { method: 'POST', body: cloudinaryFormData })
      );
    };
  };
  return Promise.all(uploadRequests);
};

export const createContent = async (
  publicUploadApiKey: string,
  publicUploadUrl: string, 
  inputValues: object, 
  inputFiles: File[],
  createSignature: () => Promise<{ timestamp: number, signature: string }>, 
  createInDb: (data: FormData) => Promise<{ success: boolean }>
): Promise<{ success: boolean }> => {
  const responseArray = await uploadFiles(
    publicUploadApiKey, publicUploadUrl, inputFiles, createSignature
  );
  responseArray.forEach(response => {
    if (!response.ok) throw new Error('not all images could be uploaded');
  });
  let imageIds: string[] = [];
  await Promise.all(responseArray.map(response => new Promise((resolve, reject) => {
    response.json().then(responseData => {
      if ((typeof responseData === 'object') && ('public_id' in responseData)) {
        imageIds.push(responseData.public_id);
        resolve(undefined);
      } else {
        reject('public_id property is missing from the response data');
      };
    });
  }))); 
  let dbFormData = new FormData();
  Object.entries(inputValues).forEach(([k, v]) => dbFormData.append(k, v ?? ''));
  imageIds.forEach(id => dbFormData.append('imageIds', id));
  return await createInDb(dbFormData);
};