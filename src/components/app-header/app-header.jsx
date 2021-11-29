import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderStyle from './app-header.module.css'


const AppHeader = () => {

    return (
        <header className={`${AppHeaderStyle.header}`}>
            <div className={`${AppHeaderStyle.wrapper}`}>
                <a href="#" className={`${AppHeaderStyle.link} p-4  p-4 `}>
                    <BurgerIcon type="secondary" /><span className={`text text_type_main-default text_color_inactive  ${AppHeaderStyle.linkText}`}>Конструктор</span></a>
                <a href="#" className={`${AppHeaderStyle.link} p-4  p-4`}>
                    <ListIcon type="secondary" /><span className={`text text_type_main-default text_color_inactive ${AppHeaderStyle.linkText}`}>Лента заказов</span></a>
                <a href="#" className={`${AppHeaderStyle.logo} p-4  p-4`}>
                    <Logo />
                </a>

                <a href="#" className={`${AppHeaderStyle.link}`}>
                    <ProfileIcon type="secondary" /><span className={`text text_type_main-default text_color_inactive ${AppHeaderStyle.linkText}`}>Личный кабинет</span>
                </a>
            </div>

        </header>
    )
}

export default AppHeader;