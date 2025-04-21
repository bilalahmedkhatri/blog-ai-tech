import React from 'react';


export function processUserProfile(userProfile) {
    if (!userProfile) return null;

    try {
        return {
            userId: userProfile.user_id ?? '',
            email: userProfile.email ?? '',
            name: [
                userProfile?.first_name,
                userProfile?.last_name
            ].filter(Boolean).join(' ') || userProfile?.name || '',
            profileImage: userProfile?.profile_image ?? '',
            securityQuestion: userProfile?.security_question ?? '',
            securityAnswer: userProfile?.security_answer ?? '',
            phoneNumber: userProfile?.phone_number ?? ''
        };
    } catch (error) {
        console.error("Error processing user profile:", error);
        return null;
    }
}

