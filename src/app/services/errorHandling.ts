import { toast } from 'react-hot-toast';

export default function handleApiError(error: any) {
    if (error.response && error.response.data) {
        const { err } = error.response.data;

        if (typeof err === 'string') {
            // Handle single string error
            toast.error(err);
        } else if (Array.isArray(err)) {
            // Handle array of error messages
            const errorMessages = err.map((e: { message: string }) => e.message).join(' ');
            toast.error(errorMessages);
        } else if (!!err) {
            // Handle unexpected error format
            toast.error('An unexpected error occurred. check your network connection and try again');
        } else {
            toast.error('An unexpected error occurred.');
        }
    } else {
        toast.error('Some thing went wrong');
    }
}
