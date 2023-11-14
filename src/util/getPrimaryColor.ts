import ColorThief from 'colorthief';

const getPrimaryColor = function (element: HTMLImageElement): string {
    const colorThief = new ColorThief();
    let res = '#000';
    if (element?.complete) {
        res = '#' + colorThief.getColor(element).map((x: number) => {
            const hex = x.toString(16)
            return hex.length === 1 ? '0' + hex : hex;
        }).join('')
    } else {
        element?.addEventListener('load', function () {
            res = '#' + colorThief.getColor(element).map((x: number) => {
                const hex = x.toString(16)
                return hex.length === 1 ? '0' + hex : hex;
            }).join('')
        })
    }
    return res;
}

export { getPrimaryColor }