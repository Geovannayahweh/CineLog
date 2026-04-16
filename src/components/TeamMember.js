import './TeamMember.css';

function TeamMember({ nome, idade, cargo, linkedin, github }) {
  return (
    <div className="team-card">
      <div className="team-avatar">
        {nome.charAt(0).toUpperCase()}
      </div>
      <div className="team-info">
        <h3 className="team-name">{nome}</h3>
        <span className="team-cargo">{cargo}</span>
        <p className="team-idade">{idade} anos</p>
        <div className="team-links">
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="team-link">
              LinkedIn
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="team-link">
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamMember;
