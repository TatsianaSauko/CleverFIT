import { useState } from 'react';
import { useSelector } from 'react-redux';
import { DownOutlined, EditOutlined } from '@ant-design/icons';
import { ModalInfoTraining } from '@components/modal-info-training';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useResponsiveVisibility } from '@hooks/use-responsive-visibility';
import { setTraining, trainingSelector } from '@redux/slices/training-slice';
import { Badge, Button, Table } from 'antd';

import { TableTrainingsProps } from '../../types/props';
import { ActivityData, Parameters } from '../../types/types';

import './table-trainings.css';

export const TableTrainings = ({ onClick }: TableTrainingsProps) => {
    const dispatch = useAppDispatch();
    const { activitiesData } = useSelector(trainingSelector);
    const [isModal, setIsModal] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const defaultVisibility = !(window.innerWidth < 576);
    const isDesktopView = useResponsiveVisibility(defaultVisibility);

    const handleButtonEdit = (record: ActivityData) => {
        dispatch(setTraining({ training: record }));
        onClick();
    };

    const columns = [
        {
            title: 'Тип тренировки',
            dataIndex: 'name',
            key: 'name',

            render: (text: string, record: ActivityData) => {
                let color;

                switch (text) {
                    case 'Ноги':
                        color = 'red';
                        break;
                    case 'Силовая':
                        color = 'green';
                        break;
                    case 'Руки':
                        color = 'cyan';
                        break;
                    case 'Спина':
                        color = 'orange';
                        break;
                    default:
                        color = 'gray';
                }

                const handleButtonClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    const rect = event.currentTarget.getBoundingClientRect();

                    dispatch(setTraining({ training: record }));
                    setModalPosition({
                        top: rect.top,
                        left: rect.left,
                    });
                    setIsModal(true);
                };

                return (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: isDesktopView ? '259px' : '116px',
                        }}
                    >
                        <Badge color={color} text={text} />
                        <Button
                            type='text'
                            onClick={handleButtonClick}
                            icon={<DownOutlined style={{ fontSize: '12px' }} />}
                        />
                    </div>
                );
            },
        },
        {
            title: '',
            dataIndex: 'spacerColumn1',
            width: 12,
            render: () => <div style={{ border: 'none', width: '12px' }} />,
        },
        {
            title: 'Периодичность',
            dataIndex: 'parameters',
            key: 'period',
            width: 240,

            render: (parameters: Parameters) => {
                let periodText;

                if (parameters.period === null) periodText = '';
                else if (parameters.period === 7) periodText = '1 раз в неделю';
                else
                    switch (parameters.period) {
                        case 1:
                            periodText = 'Через 1 день';
                            break;
                        case 2:
                        case 3:
                        case 4:
                            periodText = `Через ${parameters.period} дня`;
                            break;
                        default:
                            periodText = `Через ${parameters.period} дней`;
                    }

                return <div style={{ width: isDesktopView ? '240px' : '134px' }}>{periodText}</div>;
            },
            sorter: (a: ActivityData, b: ActivityData) => {
                const periodA = a.parameters?.period ?? 8;
                const periodB = b.parameters?.period ?? 8;

                if (periodA === null) return -1;
                if (periodB === null) return 1;
                if (periodA === 7) return -1;
                if (periodB === 7) return 1;

                return periodA - periodB;
            },
        },
        {
            title: '',
            dataIndex: 'spacerColumn2',
            width: 12,
            render: () => <div style={{ width: '12px' }} />,
        },
        {
            key: 'action',
            width: 32,

            render: (record: ActivityData) => (
                <Button
                    className='table-edit'
                    onClick={() => handleButtonEdit(record)}
                    icon={
                        <EditOutlined
                            style={{ color: 'var(--primary-light-6)', fontSize: '25px' }}
                        />
                    }
                    disabled={record.isImplementation}
                    style={{ width: '32px' }}
                />
            ),
        },
    ];

    const handleButtonBack = () => {
        setIsModal(false);
    };

    return (
        <div className='table-training__wrapper'>
            {isModal ? (
                <ModalInfoTraining
                    backClick={handleButtonBack}
                    position={modalPosition}
                    onDrawer={onClick}
                />
            ) : null}
            <Table
                rowKey={(record) => record._id || 'default'}
                dataSource={activitiesData}
                columns={columns}
                pagination={{ pageSize: 14 }}
                size='small'
                className='table-training'
            />
            <Button size='large' type='primary' className='btn-create' onClick={onClick}>
                + Новая тренировка
            </Button>
        </div>
    );
};
