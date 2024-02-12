import { Divider } from 'antd';
import React from 'react';
import './siderMobile.css';
import { Link } from 'react-router-dom';

import logoMobile from '/png/logoMobile.png';

const dataMenuTitle = {'Календарь': 'calendar', 'Тренировки': 'training', 'Достижения': 'achievements', 'Профиль':'profile', 'Выход': 'logout'}
const dataMenuArray = Object.entries(dataMenuTitle)

export const SiderMobile = ({ collapsedMobile }: { collapsedMobile: boolean }) => {

    return(
        <div className={!collapsedMobile? 'aside_mobile': 'aside_mobile trigger'}>
  <div className='logo_mobile'>
    <img src={logoMobile} alt='CleverFit'/>
  </div>
  <ul className='menu-mobile'>

    {dataMenuArray.map(([title, path], index) => {

      if (index === dataMenuArray.length - 1) {
        return (
            <div className='item-last'>
            <React.Fragment key={index}>
            <Divider className='divider'/>
            <Link to={`/${path}`}>
              <li className='item-mobile'>{title}</li>
            </Link>
          </React.Fragment>
            </div>

        )
      } else {
        return (
          <Link to={`/${path}`} key={index}>
            <li className='item-mobile'>{title}</li>
          </Link>
        )
      }
    })}
  </ul>
</div>

)};
