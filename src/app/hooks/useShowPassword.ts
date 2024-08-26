import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const useShowPassword = () => {
    
    const[isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }

    const Icon = isVisible ? FaEyeSlash : FaEye;

    return { isVisible, toggleVisibility, Icon};

}
