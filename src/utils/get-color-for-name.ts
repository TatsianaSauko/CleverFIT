export const getColorForName = (name: string) => {
    switch (name) {
        case 'Силовая':
            return 'var(--tranie-green)';
        case 'Ноги':
            return ' var(--tranie-red)';
        case 'Руки':
            return 'var(--tranie-cyan)';
        case 'Спина':
            return ' var(--tranie-orange)';
        default:
            return 'gray';
    }
};
