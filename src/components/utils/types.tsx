import React, { ChangeEvent } from 'react';

// Custom Inputs props
export interface IInputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    name: string;
    size?: 'default' | 'small'
}

// Check Response From Server res prop
export interface CustomResponse<T> extends Body {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly trailer?: Promise<Headers>;
    readonly type: ResponseType;
    readonly url: string;
    clone(): Response;
    json(): Promise<T>;
};


// Ingredient Item
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

// InputForm - Props
export interface IInputFormValues {
    name: string;
    email: string;
}

export type TInputFormValues = {
    name: string;
    email: string;
    password: string;
}


// Response from server
export type TFetchResponse = {
    success: boolean;
    message?: string;
}

// FetchOrderIngredients
export type TFetchOrderIngredients = TFetchResponse & {
    name?: string,
    order?: TOrder;
}

export type TOrder = {
    number: number
}

// Register, Login New User 
export type TFetchSignUser = TFetchResponse & {
    user: TUser;
    accessToken: string;
    refreshToken: string;
}

export type TUser = {
    email: string;
    name: string;
}

// Refresh Token 
export type TRefreshToken = Omit<TFetchSignUser, "user">;

// Get User info 
export type TGetUserInfo = Omit<TFetchSignUser, "accessToken" | "refreshToken">;

// Update User Info 
export type TUpdateUserInfo = {
    name?: string;
    password?: string;
    email?: string
}

