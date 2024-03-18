import { getColorForName } from '@utils/getColorForName';
import { Button } from 'antd';
import { TrainingContentProps } from '../../types/Props';
import { EditIcon } from '../../icons';
import { EditFilled } from '@ant-design/icons';

import './modalTrainingContent.css';

export const ModalTrainingContent = ({ value, onClick }: TrainingContentProps) => {
    return (
        <ul className='training-content'>
            {value.map((activity, index) => (
                <li
                    key={activity._id}
                    data-test-id={`modal-update-training-edit-button${index}`}
                    className={activity.isImplementation ? 'disabled' : ''}
                >
                    <div
                        className='marker'
                        style={{ backgroundColor: getColorForName(activity.name) }}
                    />
                    {activity.name}
                    {activity.isImplementation ? (
                        <Button
                            className='icon-edit'
                            data-test-id={`modal-update-training-edit-button${index}`}
                            disabled
                            icon={<EditFilled />}
                        ></Button>
                    ) : (
                        <Button
                            className='icon-edit'
                            data-test-id={`modal-update-training-edit-button${index}`}
                            onClick={() => onClick(activity.name)}
                            icon={<EditIcon />}
                        ></Button>
                    )}
                </li>
            ))}
        </ul>
    );
};
