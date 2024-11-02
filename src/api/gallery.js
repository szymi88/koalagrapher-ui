import config from "../configs";

export const saveGallery = (gallery, onSuccess) => {
    handleApiCall(async () => await fetch(`${config.API_GALLERIES_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gallery)
    })).then(onSuccess);
}

export const updateGallery = (gallery, onSuccess) => {
    if (!gallery.id) {
        throw new Error("Can't update gallery with no id");
    }

    handleApiCall(async () => await fetch(`${config.API_GALLERIES_URL}/${gallery.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gallery)
    })).then(onSuccess);
}

const handleApiCall = async (call) => {
    const response = await call();

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('API call unsuccessful, status code: ' + response.statusText);
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