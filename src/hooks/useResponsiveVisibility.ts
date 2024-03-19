import { useState, useEffect } from 'react';

export function useResponsiveVisibility(defaultVisibility: boolean) {
    const [modalVisible, setModalVisible] = useState(defaultVisibility);

    useEffect(() => {
        const handleResize = () => {
            const isVisible = window.innerWidth < 576 ? false : true;
            setModalVisible(isVisible);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [defaultVisibility]);

    return modalVisible;
}
