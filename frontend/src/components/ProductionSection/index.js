import React from 'react';
import styles from './ProductionSection.module.scss';
import Coin from '../Coin';

function ProductionSection({board, handleBoardChange}) {
  return (
    <>
      <section>
        {Object.keys(board).map((container, i) => {
          if (container !== 'c_sold') {
            return (
              <div className={styles.step}>
                <Coin
                  key={i}
                  id={container}
                  value={board[container]}
                  handleBoardChange={handleBoardChange}
                />
                <div className={styles.dots}>
                  .............................................
                </div>
              </div>
            );
          }
        })}
      </section>
    </>
  );
}

export default ProductionSection;
