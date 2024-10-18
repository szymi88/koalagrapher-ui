function map_images(images) {
    const breakpoints = [3840, 1920, 1080, 640, 384, 256, 128];

    function assetLink(asset, breakpoint) {
        // return `https://assets.yet-another-react-lightbox.com/_next/image?url=${encodeURIComponent(
        //     `/_next/static/media/${asset}`
        // )}&w=${width}&q=75`;
        return "TODO"
    }

    return images.map(({asset, width, height}) => ({
        src: assetLink(asset, width),
        width,
        height,
        srcSet: breakpoints.map((breakpoint) => ({
            src: assetLink(asset, breakpoint),
            width: breakpoint,
            height: Math.round((height / width) * breakpoint),
        }))
    }));
}
