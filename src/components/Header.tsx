import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })
    const { pathname } = useLocation();

    const isHome = useMemo(() => pathname === "/", [pathname]);

    const { fetchCategories, categories, searchRecipes, showNotification } = useAppStore();

    useEffect(() => {
        fetchCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // TODO: Validar
        if(Object.values(searchFilters).includes('')){
            showNotification({text: 'Todos los campos son obligatorios', error: true})
            return
        }
        // Consultar la API de las recetas
        searchRecipes(searchFilters)
    }

    return (
        <header
            className={
                isHome
                    ? "bg-[url(/bg.jpg)] bg-no-repeat bg-center bg-cover"
                    : "bg-slate-800"
            }
        >
            <div className="mx-auto contain-content px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="logotipo" />
                    </div>

                    <nav className="flex gap-4">
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "text-orange-400 uppercase font-bold"
                                    : "text-white uppercase font-bold"
                            }
                            to="/"
                        >
                            Inicio
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "text-orange-400 uppercase font-bold"
                                    : "text-white uppercase font-bold"
                            }
                            to="/favoritos"
                        >
                            Favoritos
                        </NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form onSubmit={handleSubmit} className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 shadow rounded-lg space-y-6">
                        <div className="space-y-4">
                            <label
                                className="block text-white uppercase font-extrabold text-lg"
                                htmlFor="ingredient"
                            >
                                Nombre o ingredientes
                            </label>

                            <input
                                value={searchFilters.ingredient}
                                onChange={handleChange}
                                className="bg-white p-3 w-full rounded-lg focus:outline-none"
                                placeholder="Nombre o Ingrediente. Ej. Vodka,, Tequila, Café"
                                name="ingredient"
                                type="text"
                                id="ingredient"
                            />
                        </div>
                        <div className="space-y-4">
                            <label
                                className="block text-white uppercase font-extrabold text-lg"
                                htmlFor="category"
                            >
                                Categoría
                            </label>

                            <select
                                value={searchFilters.category}
                                onChange={handleChange}
                                className="bg-white p-3 w-full rounded-lg focus:outline-none"
                                name="category"
                                id="category"
                            >
                                <option value="">
                                    --- Selecciona una Categoría ---
                                </option>
                                {categories.map((category) => (
                                    <option
                                        value={category.strCategory}
                                        key={category.strCategory}
                                    >
                                        {category.strCategory}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <input
                            type="submit"
                            value="Buscar Recetas"
                            className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
                        />
                    </form>
                )}
            </div>
        </header>
    );
}
