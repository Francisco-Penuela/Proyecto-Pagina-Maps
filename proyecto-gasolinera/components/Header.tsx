'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Control de modo oscuro
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-gray-800 dark:text-gray-100 shadow-sm z-50 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.png" // logo en /public/logo.png
            alt="Logo"
            width={42}
            height={42}
            priority
            className="transition-transform group-hover:scale-110"
          />
          <span className="font-bold text-2xl text-pink-500 tracking-tight">
            Gasolin<span className="text-gray-700 dark:text-gray-200">App</span>
          </span>
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
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

        {/* Controles */}
        <div className="flex items-center gap-3">
          {/* Modo oscuro */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-xl p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Cambiar tema"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {/* Botón Login */}
          <Link
            href="/login"
            className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-md text-sm font-semibold shadow-sm hover:shadow-md transition-all"
          >
            Login
          </Link>

          {/* Menú Móvil */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl ml-2 focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Menú Móvil */}
      {menuOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 pb-4 flex flex-col gap-3 shadow-inner">
          <Link href="/" className="hover:text-pink-500" onClick={() => setMenuOpen(false)}>Inicio</Link>
          <Link href="/perfil" className="hover:text-pink-500" onClick={() => setMenuOpen(false)}>Mi perfil</Link>
          <Link href="/contacto" className="hover:text-pink-500" onClick={() => setMenuOpen(false)}>Contacto</Link>
          <Link href="/login" className="hover:text-pink-500" onClick={() => setMenuOpen(false)}>Login</Link>
        </nav>
      )}
    </header>
  );
}
