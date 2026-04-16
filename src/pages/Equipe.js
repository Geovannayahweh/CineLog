import TeamMember from '../components/TeamMember';
import './Equipe.css';

const membros = [
  {
    nome: "Clara",
    idade: "19",
    cargo: "Desenvolvedora",
    linkedin: "https://www.linkedin.com/in/clara",
    github: "https://www.github.com/clara",
  },
  {
    nome: "Geovanna",
    idade: "19",
    cargo: "Desenvolvedora",
    linkedin: "https://www.linkedin.com/in/geovanna",
    github: "https://www.github.com/geovanna",
  },
  {
    nome: "Delrick",
    idade: "27",
    cargo: "Desenvolvedor",
    linkedin: "https://www.linkedin.com/in/delrick",
    github: "https://www.github.com/delrick",
  },
];

function Equipe() {
  return (
    <main className="equipe-page">
      <div className="equipe-inner">
        <div className="equipe-header">
          <span className="equipe-badge">Quem Somos</span>
          <h1 className="page-title">Nossa Equipe</h1>
          <p className="equipe-desc">
            Somos estudantes apaixonados por tecnologia e cinema, desenvolvendo o CineLog
            como projeto acadêmico para a disciplina de Desenvolvimento Web.
          </p>
        </div>

        <div className="team-grid">
          {membros.map((membro) => (
            <TeamMember key={membro.nome} {...membro} />
          ))}
        </div>

        {/* Sobre o Projeto */}
        <div className="projeto-section">
          <h2 className="projeto-title">Sobre o Projeto</h2>
          <div className="projeto-grid">
            <div className="projeto-card">
              <span className="projeto-icon">🎯</span>
              <h3>Objetivo</h3>
              <p>Centralizar opiniões e avaliações da comunidade, facilitando a descoberta de novos filmes.</p>
            </div>
            <div className="projeto-card">
              <span className="projeto-icon">🛠️</span>
              <h3>Tecnologias</h3>
              <p>React, React Router, CSS Modules, integração com API externa de filmes (TMDB).</p>
            </div>
            <div className="projeto-card">
              <span className="projeto-icon">🚀</span>
              <h3>Funcionalidades</h3>
              <p>Explorar catálogo, atribuir notas, comentar filmes e visualizar rankings da comunidade.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Equipe;
