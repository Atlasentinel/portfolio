import { Link } from "react-router-dom";
import { useLang } from "../contexts/LangContext";

export default function NotFound() {
  const { t } = useLang();
  return (
    <section className="container page-top not-found">
      <p className="mono muted">404</p>
      <h1 className="page-title">{t.notFound.title}</h1>
      <p className="muted">{t.notFound.text}</p>
      <Link to="/" className="btn btn-primary">{t.notFound.home}</Link>
    </section>
  );
}
