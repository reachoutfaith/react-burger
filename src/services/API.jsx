export const URL = 'https://norma.nomoreparties.space/api/ingredients';

export async function fetchIngredients() {
    try {
        const res = await fetch(URL);
        const data = await res.json();
        if (data.success) {
            return data
        } else {
            throw new Error('Ошибка получения данных')
        }
    } catch (err) {
        console.log(err)
    }
}

export async function fetchOrderIngredients(orderItems) {
    const body = { ingredients: orderItems };
    console.log(body)
    try {
        const res = await fetch('https://norma.nomoreparties.space/api/orders', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        if (data.success) {
            return data
        } else {
            throw new Error('Ошибка получения данных')
        }
    } catch (err) {
        console.log(err)
    }
}