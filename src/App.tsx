import 'styles/globals.scss';
import 'common/assets/fonts/font.css';
import { AuthProvider } from 'contexts/AuthContext';
import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from 'redux/store';
import router from 'router/router';
import { GoogleMapProvider } from 'contexts/GoogleMapContext';
import SnackbarElement from 'common/components/snackbar/SnackbarElement';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <GoogleMapProvider >
                <AuthProvider>
                    <SnackbarElement />
                    <RouterProvider router={router} />
                </AuthProvider>
            </GoogleMapProvider>
        </Provider>
    );
};

export default App;