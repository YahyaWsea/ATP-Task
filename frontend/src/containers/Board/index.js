import { useEffect, useState } from 'react';
import _pick from 'lodash/pick';
import styles from './Board.module.scss';
import { socket } from '../../utils/socket-connection';
import ProductionSection from '../../components/ProductionSection';
import SoldSection from '../../components/SoldSection';
import { usePromise } from '../../utils/hooks';
import { api } from '../../utils/api';

const Board = ({ playerName, team }) => {
  const apiRequest = () =>
    api.getBoard({ userName: playerName, teamName: team });
  const [loading, res, error] = usePromise(() => apiRequest(), []);
  const [board, setBoard] = useState({});

  useEffect(() => {
    setBoard(_pick(res?.data, ['c1', 'c2', 'c3', 'c4', 'c_sold']));
    if (team === 'team1') {
      socket.on('new-board-1', (newBoard) => {
        setBoard(_pick(newBoard, ['c1', 'c2', 'c3', 'c4', 'c_sold']));
      });
    } else {
      socket.on('new-board-2', (newBoard) => {
        setBoard(_pick(newBoard, ['c1', 'c2', 'c3', 'c4', 'c_sold']));
      });
    }
  }, [res, playerName, team]);

  const handleBoardChange = (newUpdate) => {
    const newBoard = { ...board, ...newUpdate };

    setBoard(newBoard);
    socket.emit('change-board', { ...newBoard, team });
  };

  return playerName ? (
    !error ? (
      <div className={styles.container}>
        <div className={`${styles.section_wrapper} ${styles.section_one}`}>
          <h3>Production</h3>

          <ProductionSection
            board={board}
            handleBoardChange={handleBoardChange}
          />
        </div>
        <div className={`${styles.section_wrapper} ${styles.section_two}`}>
          <h3>Goods Sold</h3>

          <SoldSection
            id={'c_sold'}
            value={board.c_sold}
            handleBoardChange={handleBoardChange}
          />
        </div>
      </div>
    ) : (
      <h1 className={styles.msg_error}> ERROR OCCURED while fetching board </h1>
    )
  ) : (
    <div className={styles.msg_container}>
      <h1>Please Choose player to begin the game</h1>
    </div>
  );
};

export default Board;
