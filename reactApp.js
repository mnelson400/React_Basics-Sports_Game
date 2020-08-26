function Team(props) {
  let shotPercentageDiv;

  if (props.stats.shots) {
    const shotPercentage = Math.round(
      (props.stats.score / 2 / props.stats.shots) * 100
    );
    shotPercentageDiv = (
      <div>
        <strong>Shooting %: {shotPercentage}</strong>
      </div>
    );
  }

  return (
    <div className="Team">
      <h2>{props.name}</h2>

      <div className="identity">
        <img src={props.logo} alt={props.name} />
      </div>

      <div>
        <strong>Shots:</strong> {props.stats.shots}
      </div>

      <div>
        <strong>Score:</strong> {props.stats.score}
      </div>

      {shotPercentageDiv}

      <img
        className="button"
        onClick={props.shotHandler}
        src={props.shootButton}
        alt={"Shoot Button"}
      />
    </div>
  );
}

function ScoreBoard(props) {
  return (
    <div className="ScoreBoard">
      <div className="teamStats">
        <h3>VISITORS</h3>
        <h3>{props.visitingTeamStats.score}</h3>
      </div>

      <h3>SCOREBOARD</h3>

      <div className="teamStats">
        <h3>HOME</h3>
        <h3>{props.homeTeamStats.score}</h3>
      </div>
    </div>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resetCount: 0,
      homeTeamStats: {
        shots: 0,
        score: 0,
      },
      visitingTeamStats: {
        shots: 0,
        score: 0,
      },
    };

    this.shootSound = new Audio("./assets/sounds/shoots.mp3");
    this.scoreSound = new Audio("./assets/sounds/scored.mp3");
    this.missSound = new Audio("./assets/sounds/missed.mp3");
  }

  shoot = (team) => {
    const teamStatsKey = `${team}TeamStats`;
    let score = this.state[teamStatsKey].score;
    this.shootSound.play();

    if (Math.random() > 0.5) {
      score += 2;
      setTimeout(() => {
        this.scoreSound.play();
      }, 250);
    } else {
      setTimeout(() => {
        this.missSound.play();
      }, 900);
    }

    this.setState((state, props) => ({
      [teamStatsKey]: {
        shots: state[teamStatsKey].shots + 1,
        score,
      },
    }));
  };

  resetGame = () => {
    this.setState((state, props) => ({
      resetCount: state.resetCount + 1,
      homeTeamStats: {
        shots: 0,
        score: 0,
      },
      visitingTeamStats: {
        shots: 0,
        score: 0,
      },
    }));
  };

  render() {
    return (
      <div className="Game">
        <ScoreBoard
          visitingTeamStats={this.state.visitingTeamStats}
          homeTeamStats={this.state.homeTeamStats}
        />

        <h1>Welcome to {this.props.venue}</h1>
        <div className="stats">
          <Team
            name={this.props.visitingTeam.name}
            logo={this.props.visitingTeam.logoSrc}
            stats={this.state.visitingTeamStats}
            shootButton={this.props.visitingTeam.shootButton}
            shotHandler={() => this.shoot("visiting")}
          />

          <div className="versus">
            <h1>VS</h1>
            <div>
              <img
                onClick={this.resetGame}
                src={"./assets/images/reset_button.png"}
                alt={"Reset Button"}
              />
              <br></br>
              <strong>Resets:</strong> {this.state.resetCount}
            </div>
          </div>

          <Team
            name={this.props.homeTeam.name}
            logo={this.props.homeTeam.logoSrc}
            stats={this.state.homeTeamStats}
            shootButton={this.props.homeTeam.shootButton}
            shotHandler={() => this.shoot("home")}
          />
        </div>
      </div>
    );
  }
}

function App(props) {
  const FHK = {
    name: "Front-Half Kenzie",
    logoSrc: "./assets/images/fhk_logo.png",
    shootButton: "./assets/images/basket_ball1.png",
  };

  const BHK = {
    name: "Back-Half Kenzie",
    logoSrc: "./assets/images/bhk_logo.png",
    shootButton: "./assets/images/basket_ball2.png",
  };

  const FHD = {
    name: "Front-Half Days",
    logoSrc: "./assets/images/fhd_logo.png",
    shootButton: "./assets/images/basket_ball1.png",
  };

  const BHD = {
    name: "Back-Half Days",
    logoSrc: "./assets/images/bhd_logo.png",
    shootButton: "./assets/images/basket_ball2.png",
  };

  return (
    <div className="App">
      <Game venue="Kenzie Stadium" homeTeam={FHK} visitingTeam={BHK} />
      <Game venue="Amazon Center" homeTeam={FHD} visitingTeam={BHD} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
