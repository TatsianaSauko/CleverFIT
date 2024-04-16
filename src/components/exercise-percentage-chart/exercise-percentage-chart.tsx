import { Pie } from '@ant-design/plots';
import {
    useResponsiveVisibility,
    useResponsiveVisibility900,
} from '@hooks/use-responsive-visibility';

import { ResItem } from '../../types/types';

// const customLabel = (_: any, datum: ResItem) => (
//     <div style={{ fontSize: 14, color: '#000'  }}>
//         {datum.type}
//     </div>
//   );

export const ExercisePercentageChart = ({ data }: { data: ResItem[] }) => {
    const defaultDesktopVisibility = !(window.innerWidth < 900);
    const isDesktopView = useResponsiveVisibility900(defaultDesktopVisibility);

    const defaultMobileVisibility = !(window.innerWidth < 576);
    const isMobileView = useResponsiveVisibility(defaultMobileVisibility);

    const config = {
        data,
        angleField: 'value',
        colorField: 'type',
        innerRadius: 0.7,
        label: {
            text: 'type',
            position: 'outside',
            style: {
                fontSize: 14,
            },
        },
        width: isMobileView ? 520 : 328,
        height: isDesktopView ? 334 : 211,
        style: {
            textAlign: 'center',
        },
        legend: false,
    };

    return <Pie {...config} />;
};
