import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styles from './Coin.module.scss';

export default function Coin({ id, value, handleBoardChange }) {
  const ref = useRef(null);
  const [{}, drag] = useDrag(() => ({
    type: 'coin',
    item: () => ({ id, value }),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{}, drop] = useDrop({
    accept: 'coin',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop(item, monitor) {
      handleBoardChange({ [id]: value + item.value });
    },
  });

  drag(drop(ref));
  return (
    <div
      ref={ref}
      className={
        id === 'c_sold'
          ? `${styles.circle}`
          : `${styles.circle} ${styles.circle_wrapper}`
      }
    >
      {value}
    </div>
  );
}
