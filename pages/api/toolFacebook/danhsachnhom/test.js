import axios from 'axios';

// Function to get filtered groups
export const getFilteredGroups = async (joinedAccount, limit = null) => {
    try {
        const params = { joined_account: joinedAccount };
        if (limit) params.limit = limit;
        
        const response = await axios.get('http://localhost:3003/api/groups/filter', {
        params: params
        });
        
        console.log('Success:', response.data.message);
        console.log('Groups:', response.data.data);
        return response.data.data;
        
    } catch (error) {
        if (error.response) {
        console.error('Error:', error.response.data.message);
        } else {
        console.error('Network error:', error.message);
        }
    }
};

export default getFilteredGroups;