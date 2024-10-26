import config from "../config";

export const saveGallery = async (gallery) => {
    console.log(gallery);
    try {
        const response = await fetch(config.API_GALLERIES_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gallery)
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}