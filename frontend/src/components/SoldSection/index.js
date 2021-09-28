import React from 'react';
import Coin from '../Coin';

function SoldSection({ id, value, handleBoardChange }) {
  return (
    <>
      <section>
        <Coin id={id} value={value} handleBoardChange={handleBoardChange} />
      </section>
    </>
  );
}

export default SoldSection;
