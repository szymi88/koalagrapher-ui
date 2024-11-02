import config from "../configs";

export const saveGallery = async (gallery) => {
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

export const fetchGallery = async (id) => {
    const response = await fetch(`${config.API_GALLERIES_URL}/${id}`);
    if (!response.ok) throw new Error(`Fetching gallery ${id} failed: ${response.statusText}`);
    return await response.json();
}

export const fetchGalleries = async () => {
    const response = await fetch(`${config.API_GALLERIES_URL}`);
    if (!response.ok) throw new Error(`Fetching galleries failed: ${response.statusText}`);
    return await response.json();
}