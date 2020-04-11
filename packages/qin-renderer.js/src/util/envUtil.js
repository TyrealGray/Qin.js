//@flow
export function getRenderAssets(path: string) {
    if(process.env.QIN_RENDERER === 'DEV'){
        return `./assets/${path}`;
    }

    return `./node_modules/qin-renderer.js/assets/${path}`;
}