import { useSelector } from 'react-redux';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ContentInfoTraining } from '@components/content-info-training';
import { useResponsiveVisibility } from '@hooks/use-responsive-visibility';
import { trainingSelector } from '@redux/slices/training-slice';
import { getColorForName } from '@utils/get-color-for-name';
import { Button, Divider } from 'antd';

import { ModalInfoTrainingProps } from '../../types/props';

import './modal-info-training.css';

export const ModalInfoTraining = ({ backClick, position, onDrawer }: ModalInfoTrainingProps) => {
    const { training } = useSelector(trainingSelector);
    const defaultVisibility = !(window.innerWidth < 576);
    const isDesktopView = useResponsiveVisibility(defaultVisibility);

    const handleButtonAddTraining = () => {
        backClick();
        onDrawer();
    };

    return (
        <div
            className='modal-training-edit'
            data-test-id='modal-create-exercise'
            style={{
                top: position.top - 5,
                left: isDesktopView ? position.left - 213 : position.left - 84,
            }}
        >
            <div className='info-training__header'>
                <ArrowLeftOutlined onClick={backClick} />
                <div>{training.name}</div>
            </div>

            <Divider style={{ background: getColorForName(training.name), height: '2px' }} />

            <ContentInfoTraining />
            <Divider />
            <div className='btn-wrapper'>
                <Button
                    className='btn__add-training'
                    block={true}
                    onClick={handleButtonAddTraining}
                >
                    Добавить упражнения
                </Button>
            </div>
        </div>
    );
};
