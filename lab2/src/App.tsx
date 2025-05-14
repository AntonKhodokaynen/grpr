import { useState } from 'react';
import { Box, Button, Text, VStack, HStack } from '@chakra-ui/react';

function Square({ value, onSquareClick }) {
  return (
    <Button
      size="lg"
      w="60px"
      h="60px"
      fontSize="2xl"
      bg={value === 'X' ? 'blue.300' : value === 'O' ? 'red.300' : 'gray.200'}
      color="white"
      onClick={onSquareClick}
    >
      {value}
    </Button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);
  let status;
  if (winner) {
    status = `Победитель: ${winner}`;
  } else if (isDraw) {
    status = 'Ничья';
  } else {
    status = `Следующий ход: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <VStack spacing={4} align="center">
      <Box p={4} bg="yellow.300" borderRadius="md" fontSize="xl" fontWeight="bold">
        {status}
      </Box>
      {[0, 3, 6].map((row) => (
        <HStack key={row} spacing={2}>
          <Square value={squares[row]} onSquareClick={() => handleClick(row)} />
          <Square value={squares[row + 1]} onSquareClick={() => handleClick(row + 1)} />
          <Square value={squares[row + 2]} onSquareClick={() => handleClick(row + 2)} />
        </HStack>
      ))}
    </VStack>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  return (
    <VStack spacing={4} p={5} align="center">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <VStack align="start">
        {history.map((_, move) => (
          <Button key={move} size="sm" onClick={() => jumpTo(move)} bg="purple.300" color="white">
            {move ? `Перейти к ходу #${move}` : 'Перейти к началу игры'}
          </Button>
        ))}
      </VStack>
    </VStack>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}