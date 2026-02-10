

'use client'

export interface User{
    email: string
    name: string
}

export const mockLogin = (email: string, password: string): User | null => {
    if(email ==='admin' && password === 'admin'){
        const user = {
            email: 'admin@autoposting.com',
            name: 'Admin'
        }

        if(typeof window !== 'undefined'){
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('isAuthenticated', 'true')
        }

        return user
    }
    
    return null
}


export const mockRegister = (
    name: string,
    email: string,
    password: string
): User | null => {
    // API istekleri gelecek

    const user = {
        email,
        name
    }

    if(typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('isAuthenticated', 'true')

    }

    return user
}


export const mockLogout = () => {
    if(typeof window !== 'undefined'){
        localStorage.removeItem('user'),
        localStorage.removeItem('isAuthenticated')
    }
}


export const isAuthenticated = (): boolean => {
    if(typeof window !== 'undefined'){
        return localStorage.getItem('isAuthenticated') === 'true'
    }

    return false
}


export const getCurrentUser = (): User | null => {
    if(typeof window !== 'undefined'){
        const userStr = localStorage.getItem('user')
        return userStr ? JSON.parse(userStr) : null
    }

    return null
}