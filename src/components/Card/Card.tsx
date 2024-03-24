import { Button, Divider } from 'antd';
import { CardProps } from '../../types/Props';

import './card.css';

export const Card = ({ title, link, icon, onClick }: CardProps) => (
    <div className='card'>
        <div className='card__title'>{title}</div>
        <Divider className='divider' />
        <div className='card__link'>
            <Button
                icon={icon}
                block
                onClick={onClick}
                data-test-id={
                    link === 'Календарь'
                        ? 'menu-button-calendar'
                        : link === 'Профиль'
                        ? 'menu-button-profile'
                        : undefined
                }
            >
                {link}
            </Button>
        </div>
    </div>
);
