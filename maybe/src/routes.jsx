import { Route, Routes } from "react-router-dom";

import { LISU } from './lisu';
import { App } from './mainPage';


export function MyRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<LISU />} />
                <Route path="/In" element={<App />} />
            </Routes>
        </>
    );
};