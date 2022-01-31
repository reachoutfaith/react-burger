# Проект Stellar Burger

### Технологический стек: 

React, React-Router, React-DnD, Redux, Typescript, WebSockets,  Jest, Cypress

### Описание проекта:
Проект - это сайт космического ресторана.
При помощи react DnD пользователь может перетягивать ингредиенты в конструктор, сформировывать заказ, отправлять его на сервер, отслеживать статусы заказов в ленте, а также в своем Личном кабинете в Истории заказов, где они обновляются в режиме реального времени (запросы к серверу отправляются по WebSockets).
С помощью роутинга можно переходить на разные страницы сайта, имеются авторизация, регистрация, сброс пароля,в личный кабинет можно попасть только по защищенному маршруту. 
По нажатию на ингредиенты и заказы открываются поп-апы со дополнительной информацией.
При разработке использовались следующие технологии: React, React Router, React DnD, Redux, TypeScript, WebSockets
Редьюсеры покрыты тестами Jest, с помощью Cypress были написаны тесты для авторизации, мадольных окон и проверки работы перетягивании ингредиентов. 

### Запуск проекта:

Проект можно клонировать с данной страницы GitHub и запустить в Visual Studio Code коммандой npm start.

### GH-Pages:

Ссылка на gh-pages проекта: https://reachoutfaith.github.io/react-burger/index.html

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
