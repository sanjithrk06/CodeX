import axiosInstance from './axiosInstance';

// Generate Uid Func
function generateUid() {
    const digits = '0123456789';
    const specialCharacters = '!@#$%^&()';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let uid = '';

    for (let i = 0; i < 2; i++) {
        uid += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    for (let i = 0; i < 2; i++) {
        uid += specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));
    }

    for (let i = 0; i < 6; i++) {
        uid += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    uid = uid.split('').sort(() => Math.random() - 0.5).join('');

    return uid;
}

export const postCode = async (endpoint, code, input, expectedOutput) => {
    
    const payload = {
        uid: generateUid(),
        code: code,
        input: input,
        expectedOutput: expectedOutput
    }

    try {
        const response = await axiosInstance.post(endpoint, payload);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
