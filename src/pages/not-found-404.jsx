import style from './login.module.css'

const NotFound404 = () => {
    return (
        <div className={`${style.container}`}>
            <h1 className='text text_type_main-medium'>Oops! 404 Error</h1>
            <p className="text text_type_main-default mt-6">The page you requested does not exist</p>
        </div>
    )
}

export default NotFound404;