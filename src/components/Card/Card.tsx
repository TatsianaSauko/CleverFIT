import { Button, Divider } from 'antd';

import { CardProps } from '../../types/Props';
import { DataTestId } from '../../types/Types';

import './card.css';

const dataTestIds: DataTestId = {
    Календарь: 'menu-button-calendar',
    Профиль: 'menu-button-profile',
};

export const Card = ({ title, link, icon, onClick }: CardProps) => (
    <div className='card'>
        <div className='card__title'>{title}</div>
        <Divider className='divider' />
        <div className='card__link'>
            <Button icon={icon} block={true} onClick={onClick} data-test-id={dataTestIds[link]}>
                {link}
            </Button>
        </div>
    </div>
);
