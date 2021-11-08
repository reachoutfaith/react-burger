export const URL = 'https://norma.nomoreparties.space/api';

export async function fetchIngredients() {
    const res = await fetch(URL + '/ingredients');
    const data = await res.json();
    return data
}

export async function fetchOrderIngredients(orderItems) {
    const body = { ingredients: orderItems };
    const res = await fetch(URL + '/orders', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await res.json();
    return data
}