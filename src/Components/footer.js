import { useLang } from "../contexts/LangContext";

function Footer() {
  const { t } = useLang();

  return (
    <footer className="text-center py-8 w-screen bg-slate-50 border-t border-gray-100">
      <span className="text-sm text-gray-400">
        🌳 © {new Date().getFullYear()}{" "}
        <a href="/" className="hover:text-[#675fd3] hover:underline transition-colors">
          Noé ZIADI
        </a>
        . {t.footer.rights} 🌳
      </span>
    </footer>
  );
}

export default Footer;
