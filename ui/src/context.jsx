import { useOutletContext } from "react-router-dom";

// Create a context for user profile data
export function useUserProfile() {
    return useOutletContext();
}