import { Button, Divider } from 'antd';
import { CardProps } from '../../types/Props';

import './card.css';

export const Card = ({ title, link, icon }: CardProps) => (
    <div className='card'>
        <div className='card__title'>{title}</div>
        <Divider className='divider' />
        <div className='card__link'>
            <Button icon={icon} block>
                {link}
            </Button>
        </div>
    </div>
);
