import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderStyle from './app-header.module.css';
import { Link, NavLink, useLocation } from 'react-router-dom';


const AppHeader = () => {
    const { pathname } = useLocation<any>();

    return (
        <header className={`${AppHeaderStyle.header}`}>
            <div className={`${AppHeaderStyle.wrapper}`}>
                <NavLink to="/" className={`${AppHeaderStyle.link} p-4  p-4 `} activeClassName={AppHeaderStyle.linkActive}>
                    <BurgerIcon type={`${pathname === '/' ? 'primary' : 'secondary'}`} />
                    <span className={`${pathname === '/' ? 'text_color_active' : 'text_color_inactive'} text text_type_main-default  ${AppHeaderStyle.linkText}`}>Конструктор</span>
                </NavLink>
                <NavLink to='/orders' className={`${AppHeaderStyle.link}`} activeClassName={AppHeaderStyle.linkActive}>
                    <ListIcon type={`${pathname === '/orders' ? 'primary' : 'secondary'}`} />
                    <span className={`${pathname === '/orders' ? 'text_color_active' : 'text_color_inactive'} text text_type_main-default  ${AppHeaderStyle.linkText}`}>Лента заказов</span>
                </NavLink>
                <Link to="/" className={`${AppHeaderStyle.logo} p-4  p-4`}>
                    <Logo />
                </Link>
                <NavLink to='/profile' className={`${AppHeaderStyle.link}`} activeClassName={AppHeaderStyle.linkActive}>
                    <ProfileIcon type={`${pathname.includes('/profile') ? 'primary' : 'secondary'}`} />
                    <span className={`${pathname.includes('/profile') ? 'text_color_active' : 'text_color_inactive'} text text_type_main-default ${AppHeaderStyle.linkText}`}>Личный кабинет</span>
                </NavLink>
            </div>

        </header>
    )
}

export default AppHeader;