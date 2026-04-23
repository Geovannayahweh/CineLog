import TeamMember from '../components/TeamMember';
import './Equipe.css';

const membros = [
  {
    nome: "Clara",
    idade: "19",
    cargo: "Desenvolvedora",
    linkedin: "https://www.linkedin.com/in/clara-amazonas-pereira-da-costa-79445635a/",
    github: "https://github.com/claraamz",
  },
  {
    nome: "Geovanna",
    idade: "19",
    cargo: "Desenvolvedora",
    linkedin: "https://www.linkedin.com/in/geovanna-soto-4aaa9b233/",
    github: "https://github.com/Geovannayahweh",
  },
  {
    nome: "Delrick",
    idade: "27",
    cargo: "Desenvolvedor",
    linkedin: "https://www.linkedin.com/in/delrickramos/",
    github: "https://github.com/delrickramos",
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
            como projeto acadêmico para a disciplina Web Development: Framework.
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
              <p>React, React Router e CSS customizado para uma interface responsiva.</p>
            </div>
            <div className="projeto-card">
              <span className="projeto-icon">🚀</span>
              <h3>Funcionalidades</h3>
              <p>Explorar catálogo, buscar por título e filtrar filmes por gênero.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Equipe;
