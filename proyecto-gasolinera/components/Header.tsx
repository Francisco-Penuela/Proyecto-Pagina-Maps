'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Activar o desactivar modo oscuro
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png" // Coloca tu logo en /public/logo.png
              alt="Logo"
              width={40}
              height={40}
              priority
            />
            <span className="font-bold text-xl text-pink-500">GasolinApp</span>
          </Link>
        </div>

        {/* Menú Desktop */}
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-pink-500 transition-colors">
            Inicio
          </Link>
          <Link href="/perfil" className="hover:text-pink-500 transition-colors">
            Mi perfil
          </Link>
          <Link href="/contacto" className="hover:text-pink-500 transition-colors">
            Contacto
          </Link>
        </nav>

        {/* Botones */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-xl p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <Link
            href="/login"
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="border border-pink-500 text-pink-500 hover:bg-pink-50 px-4 py-2 rounded-md text-sm font-semibold transition"
          >
            Registro
          </Link>

          {/* Menú móvil */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl ml-2"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {menuOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 pb-4 flex flex-col gap-3">
          <Link href="/" className="hover:text-pink-500">Inicio</Link>
          <Link href="/perfil" className="hover:text-pink-500">Mi perfil</Link>
          <Link href="/contacto" className="hover:text-pink-500">Contacto</Link>
          <Link href="/login" className="hover:text-pink-500">Login</Link>
          <Link href="/register" className="hover:text-pink-500">Registro</Link>
        </nav>
      )}
    </header>
  );
}
