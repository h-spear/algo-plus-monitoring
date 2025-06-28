import React, { useContext, useState } from 'react';
import {
    Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AuthContext } from '@/auth/AuthContext';

const Login = () => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const auth = useContext<AuthContext>(AuthContext);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const handleSumbit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!auth) return;
        if (auth.login(password)) {
            console.log('success!');
        } else {
            alert('invalid password.');
        }
    };

    return (
        <div className='w-full flex justify-center items-center text-[#2d4739]'>
            <div className='bg-[#f0ffc0] min-w-80 max-w-100 mx-6 w-full h-64 flex justify-center items-center flex-col rounded-2xl relative shadow-2xl'>
                <div className='absolute top-[-36px] w-240 text-center'>
                    <p className='font-sans'>
                        This is accessible to administrators only.
                    </p>
                </div>
                <p className='text-xl font-bold mb-6'>
                    Enter Administrator Password.
                </p>
                <div className='bg-white flex justify-center items-center h-24 rounded-xl px-6'>
                    <FormControl
                        sx={{ m: 1, width: '25ch' }}
                        variant='standard'
                        color='success'
                    >
                        <InputLabel
                            htmlFor='standard-adornment-password'
                            color='success'
                        >
                            PASSWORD
                        </InputLabel>
                        <Input
                            id='standard-adornment-password'
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label={
                                            showPassword
                                                ? 'hide the password'
                                                : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
                <div className='mt-5'>
                    <Button
                        variant='contained'
                        color='success'
                        sx={{ width: '120px' }}
                        onClick={handleSumbit}
                    >
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
