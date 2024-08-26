import React, { useLayoutEffect } from 'react'
import { useAuthContext } from '../context/authcontext';
import { useRouter } from 'next/navigation';

/**
 * Checkis if user is authenticated and navigates to dashboard 
 * if user is already logged in then it prevents 
 * to access any authentication page
 **/

export default function useRouteChecker() {

    const router = useRouter();
    const { isAuthenticated, CURRENT_USER_TYPE } = useAuthContext()

    useLayoutEffect(() => {
        if (isAuthenticated && CURRENT_USER_TYPE === 1) {
            return router.replace('/dashboard');
        }
        if (isAuthenticated && CURRENT_USER_TYPE === 0) {
            return router.replace('/userdashboard');
        }
    }, []);
    return;
};
