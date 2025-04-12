'use client';
import { Button } from '@mui/material';
import { auth } from '../firebase';
import { updateUserData } from '../apis/userApi';

export default function UpdateButton() {
    const handleClick = async () => {
        const token = await auth.currentUser?.getIdToken();
        if (!token) return;

        try {
            await updateUserData(token, { age: Math.floor(Math.random() * 100) });
            alert('User updated!');
        } catch {
            alert('Failed to update');
        }
    };

    return <Button onClick={handleClick}>Update Age</Button>;
}
