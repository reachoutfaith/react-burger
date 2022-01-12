import React, { FC } from 'react';
import style from '../../pages/profile.module.css';
import OrderCutMode from '../orders-feed/order-cut-mode';
import { useSelector } from '../../services/hooks';

const UserOrdersFeed: FC = () => {
    const orders = useSelector((store) => store.orders.orders);

    return (
        <div className={`ml-15 ${style.ordersFeed} pr-2`}>
            {orders.map((item, index) => {
                return <div className="mb-6" key={item._id + index}>
                    <OrderCutMode
                        _id={item._id}
                        createdAt={item.createdAt}
                        updatedAt={item.updatedAt}
                        status={item.status}
                        number={item.number}
                        name={item.name}
                        ingredients={item.ingredients} />
                </div>
            })}
        </div>

    )
}



export default UserOrdersFeed;