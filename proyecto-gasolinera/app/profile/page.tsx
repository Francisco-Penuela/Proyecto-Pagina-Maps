'use client';

import Link from 'next/link';

export default function ProfilePage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg rounded-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-pink-500 mb-4">
          Mi Perfil
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          Actualmente no has iniciado sesión con ningún perfil.
        </p>
        <Link
          href="/login"
          className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md font-semibold transition-colors duration-200 shadow-md"
        >
          Ir al Login
        </Link>
      </div>
    </section>
  );
}
