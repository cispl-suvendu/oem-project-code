import React, { useLayoutEffect } from 'react'
import { useAuthContext } from '../context/authcontext';
import { useRouter } from 'next/navigation';

/**
* Checkis if user is not authenticated and navigates to login 
* if user is not logged in then it prevents 
* to access any authentication page
**/

export default function useAuthCheck() {
    const router = useRouter();
    const { isAuthenticated } = useAuthContext()
    useLayoutEffect(() => {
        if (!isAuthenticated) {
            return router.replace('/login')
        }
    }, [])
    return;
}
