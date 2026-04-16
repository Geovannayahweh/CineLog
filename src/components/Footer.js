import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-logo">🎬 CineLog</span>
        <p className="footer-text">
          Desenvolvido com ❤️ pela equipe CineLog &bull; Disciplina de Desenvolvimento Web
        </p>
        <p className="footer-year">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

export default Footer;
