export interface IInputProps {
    value: string;
    onChange: (e: any) => void;
    name: string;
    size?: 'default' | 'small'
}

export type TItem = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile?: string,
    image_large?: string,
    __v?: number
}

export interface IFetchResponse<T> {
    success?: boolean;
    [key: string]: any
}

export interface IFormProps {
    name: string;
    email: string;
}