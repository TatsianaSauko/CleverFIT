
import { Button, Divider } from 'antd';
import { ReactNode } from 'react';

import './card.css';

interface CardProps {
    title: string;
    link: string;
    icon: ReactNode;
  }

export const Card = ({ title, link, icon}: CardProps) => (
      <div className='card'>
        <div className='card_title'>{title}</div>
        <Divider className='divider'/>
        <div className='card_link'>
          <Button icon={icon} block>
            {link}
          </Button>
        </div>
      </div>
);
