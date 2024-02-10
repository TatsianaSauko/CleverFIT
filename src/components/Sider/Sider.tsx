import { Menu, Divider } from 'antd';
import { Layout as AntLayout } from 'antd';
import { HeartIcon, TrophyIcon, CalendarIcon, IdCardIcon } from './../../icons/index';
import { createFromIconfontCN } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './sider.css';
import cleverFit from '/png/cleverFit.png';
import fit from '/png/fit.png';

const { Sider: AntSider } = AntLayout;


const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

export const Sider = ({ collapsed }: { collapsed: boolean }) => (
  <AntSider width={208} collapsedWidth={64} trigger={null} collapsible collapsed={collapsed} className='aside'>
    <div className='logo'>
      {!collapsed ? <img src={cleverFit} alt='CleverFit' /> : null}
      {collapsed ? <img src={fit} alt='Fit' /> : null}

    </div>
    <Menu className='menu' mode="inline">
      <Menu.Item key='1' icon={<CalendarIcon />}>
        <Link to="/calendar">Календарь</Link>
      </Menu.Item>
      <Menu.Item key='2' icon={<HeartIcon />}>
        <Link to="/training">Тренировки</Link>
      </Menu.Item>
      <Menu.Item key='3' icon={<TrophyIcon />}>
        <Link to="/achievements">Достижения</Link>
      </Menu.Item>
      <Menu.Item key='4' icon={<IdCardIcon />}>
        <Link to="/profile">Профиль</Link>
      </Menu.Item>
      <div>
        <Divider className='divider'/>
        <Menu.Item key='5' icon={<IconFont type="icon-tuichu" className='icon_exit'/>}>
          <Link to="/logout">Выход</Link>
        </Menu.Item>
      </div>
    </Menu>
  </AntSider>
);
