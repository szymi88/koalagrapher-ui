import configs from "../configs";

export function assetLink(photoId, width) {
    return `${configs.API_IMAGES_URL}/${photoId}?w=${width}`;
}