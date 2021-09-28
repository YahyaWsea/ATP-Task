import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';



function Header() {
  return (
    <>
      <header className={styles.App_header}>
        <h3>Team1</h3>
        <p>
          <Link to="/board?name=player1&team=team1">Player1</Link>
        </p>
        <p>
          <Link to="/board?name=player2&team=team1">Player2</Link>
        </p>
        <h3>Team2</h3>
        <p>
          <Link to="/board?name=player3&team=team2">Player3</Link>
        </p>
        <p>
          <Link to="/board?name=player4&team=team2">Player4</Link>
        </p>
      </header>
    </>
  );
}

export default Header;
