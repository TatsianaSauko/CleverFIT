import { useState } from 'react';
import { useSelector } from 'react-redux';
import { JointTrainingsComponent } from '@components/joint-trainings-component';
import { MarathonComponent } from '@components/marathon-component';
import { ModalTrainingListError } from '@components/modal-training-list-error';
import { MyTrainingsComponent } from '@components/my-trainings-component';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { getTrainingList } from '@redux/action-creators';
import { authSelector } from '@redux/slices/auth-slice';
import {
    setGetTrainingListError,
    setIisModal,
    trainingSelector,
} from '@redux/slices/training-slice';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import './training-page.css';

const items: MenuProps['items'] = [
    {
        label: 'Мои тренировки',
        key: 'Мои тренировки',
        style: { order: 'inherit' },
    },
    {
        label: 'Совместные тренировки',
        key: 'Совместные тренировки',
        style: { order: 'inherit', opacity: '1', position: 'initial', overflowY: 'inherit' },
    },
    {
        label: 'Марафон',
        key: 'Марафон',
        style: { order: 'inherit', opacity: '1', position: 'initial', overflowY: 'inherit' },
    },
];

export const TrainingPage = () => {
    const dispatch = useAppDispatch();
    const { token } = useSelector(authSelector);
    const { isModal } = useSelector(trainingSelector);
    const [isModalTrainingList, setIsModalTrainingList] = useState<boolean>(isModal);

    const [current, setCurrent] = useState('Мои тренировки');

    const update = async () => {
        dispatch(setIisModal({ isModal: false }));
        try {
            await dispatch(getTrainingList(token));
        } catch {
            setIsModalTrainingList(true);
            dispatch(setIisModal({ isModal: true }));
        }
    };

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    let ComponentToRender: () => JSX.Element | null = () => null;

    switch (current) {
        case 'Мои тренировки':
            ComponentToRender = MyTrainingsComponent;
            break;
        case 'Совместные тренировки':
            ComponentToRender = JointTrainingsComponent;
            break;
        case 'Марафон':
            ComponentToRender = MarathonComponent;
            break;
    }

    const handleModalToggle = () => {
        setIsModalTrainingList(false);
        dispatch(setIisModal({ isModal: false }));
        dispatch(setGetTrainingListError({ getTrainingListError: true }));
    };

    return (
        <Content className='main main-training'>
            <ModalTrainingListError
                isModalTrainingList={isModalTrainingList}
                handleModalToggle={handleModalToggle}
                update={update}
            />
            <div className='training-page'>
                <Menu
                    overflowedIndicator={null}
                    className='menu-training'
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode='horizontal'
                    items={items}
                />
                <ComponentToRender />
            </div>
        </Content>
    );
};
