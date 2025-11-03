export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-center py-6 mt-20 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm">
          © {new Date().getFullYear()} GasolinApp — Todos los derechos reservados.
        </p>
        <div className="flex justify-center gap-4 mt-2 text-sm">
          <a href="/politica" className="hover:text-pink-500">Política de Privacidad</a>
          <a href="/terminos" className="hover:text-pink-500">Términos de uso</a>
        </div>
      </div>
    </footer>
  );
}
