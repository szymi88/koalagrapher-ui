import configs from "../configs";

export default function mapToGalleryFormat(photos) {
    const breakpoints = [3840, 1920, 1080, 640, 384, 256, 128];

    function assetLink(photoId, width) {
        return `${configs.API_IMAGES_URL}/${photoId}&w=${width}`;
    }

    return photos.map(photo => {
        let localResource = photo.url && photo.url.startsWith('blob:');
        let result = {
            src: localResource ? photo.url : assetLink(photo.id, photo.width),
            key: photo.id,
            id: photo.id,
            width: photo.width,
            height: photo.height
        }
        if (!localResource) {
            result.srcSet = breakpoints.map((breakpoint) => ({
                    src: assetLink(photo.id, breakpoint),
                    width: breakpoint,
                    height: Math.round((photo.height / photo.width) * breakpoint),
                }));
        }
        return result;
    });
}
