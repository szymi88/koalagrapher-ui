import config from "../configs";

function useUploadPhotos(onUploadSuccess, onUploadError) {

    return async (id, file) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch(`${config.API_IMAGES_URL}/${id}`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            onUploadSuccess(id);
        } catch (err) {
            onUploadError(err);
        }
    }
}

export default useUploadPhotos;