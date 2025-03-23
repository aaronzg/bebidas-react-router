import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./Views/IndexPage";
import Layout from "./layouts/Layout";
import { Suspense, lazy } from "react";

// Uso de lazy
const FavoritesPage = lazy(() => import('./Views/FavoritesPage'))

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="" element={<IndexPage />} index/>
                    <Route path="favoritos" element={
                        <Suspense fallback='Cargando...'>
                            <FavoritesPage />
                        </Suspense>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
