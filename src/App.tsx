import 'styles/globals.scss';
import 'common/assets/fonts/font.css';
import { AuthProvider } from 'contexts/AuthContext';
import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from 'redux/store';
import router from 'router/router';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </Provider>
    );
};

export default App;