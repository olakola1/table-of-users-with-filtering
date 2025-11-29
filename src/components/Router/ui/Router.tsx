import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from '../../../pages';
import { Routes as Paths  } from '../../../config/routes'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path={Paths.home} element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
};