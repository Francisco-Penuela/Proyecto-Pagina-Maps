import { FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        
        {/* Logo y nombre */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-pink-500">Gasolin</span>
          <span className="text-gray-800 dark:text-gray-200 font-semibold">App</span>
        </div>

        {/* Enlaces */}
        <div className="flex items-center gap-6">
          <a
            href="/politica"
            className="hover:text-pink-500 transition-colors duration-200"
          >
            Política de Privacidad
          </a>
          <a
            href="/terminos"
            className="hover:text-pink-500 transition-colors duration-200"
          >
            Términos de Uso
          </a>
        </div>

        {/* Redes sociales */}
        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-colors"
            aria-label="Facebook"
          >
            <FaFacebookF size={18} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram size={18} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>
        </div>
      </div>

      {/* Derechos reservados */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 py-3 border-t border-gray-100 dark:border-gray-800">
        © {new Date().getFullYear()} GasolinApp — Todos los derechos reservados.
      </div>
    </footer>
  );
}
