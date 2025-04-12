'use client';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading, setError } from '../../store/userSlice';
import { fetchUserData } from '../../apis/userApi';
import { Typography, CircularProgress } from '@mui/material';
import { RootState } from '../../store/store';
import UpdateButton from '../../components/UpdateButton';

export default function MainPage() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        const getData = async () => {
            dispatch(setLoading(true));
            try {
                const token = await auth.currentUser?.getIdToken();
                if (!token) throw new Error('No token');

                const data = await fetchUserData(token);
                dispatch(setUser(data));
                dispatch(setError(null));
            } catch (error) {
                if (error instanceof Error) {
                    dispatch(setError(error.message));
                } else {
                    dispatch(setError('Unknown error'));
                }
            } finally {
                setAuthReady(true);
            }
        };

        if (auth.currentUser) {
            getData();
        } else {
            // Tunggu sampai Firebase Auth siap
            const unsubscribe = auth.onAuthStateChanged(() => {
                getData();
            });

            return () => unsubscribe();
        }
    }, [dispatch]);

    if (!authReady) {
        return (
            <div style={{ padding: '20px' }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            {user.loading ? (
                <CircularProgress />
            ) : user.error ? (
                <Typography color="error">{user.error}</Typography>
            ) : (
                <>
                    <Typography variant="h6">Hello, {user.name}</Typography>
                    <Typography variant="body1">Email: {user.email}</Typography>
                    <Typography variant="body1">Age: {user.age}</Typography>
                    <UpdateButton />
                </>
            )}
        </div>
    );
}
