import axios from 'axios';

const BASE_URL = 'https://aircall-api.onrender.com/activities';

export const fetchActivities = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching activities:', error);
        throw error;
    }
};

export const fetchActivityDetail = async (callId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${callId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching activity detail:', error);
        throw error;
    }
};

export const archiveCall = async (callId) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${callId}`, {
            is_archived: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error archiving call:', error);
        throw error;
    }
};

export const unarchiveCall = async (callId) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${callId}`, {
            is_archived: false,
        });
        return response.data;
    } catch (error) {
        console.error('Error unarchiving call:', error);
        throw error;
    }
};

export const resetActivities = async () => {
    try {
        await axios.patch('https://aircall-api.onrender.com/reset');
    } catch (error) {
        console.error('Error resetting activities:', error);
        throw error;
    }
};