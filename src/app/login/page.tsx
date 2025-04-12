'use client';
import { Button } from '@mui/material';
import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import GoogleIcon from '@mui/icons-material/Google';

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        router.push('/main');
    };

    return (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            <Button variant="outlined" color='primary' startIcon={<GoogleIcon />} onClick={handleLogin}>
                Login with Google
            </Button>
        </div>
    );
}
