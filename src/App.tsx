import { useState } from 'react';

function App() {
  const [secretNumber, setSecretNumber] = useState(
    Math.floor(Math.random() * 20 + 1)
  );
  const [score, setScore] = useState(20);
  const [highScore, setHighScore] = useState(0);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Start guessing...');
  const [isGameOver, setIsGameOver] = useState(false);

  function handleCheck() {
    if (!guess) {
      setMessage('⛔️ No number!');
    } else if (+guess === secretNumber) {
      setIsGameOver(true);
      setMessage('🎉 Correct Number!');
      document.body.style.backgroundColor = '#60b347';
      if (score > highScore) {
        setHighScore(score);
      }
    } else if (+guess !== secretNumber) {
      if (score > 1) {
        setMessage(+guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
        setScore((score) => score - 1);
      } else {
        setMessage('💥 You lost the game!');
        setScore(0);
        setIsGameOver(true);
      }
    }
  }
  function handleGameReset() {
    setIsGameOver(false);
    setGuess('');
    setSecretNumber(Math.floor(Math.random() * 20 + 1));
    document.body.style.backgroundColor = '#222';
  }
  function handleGuessChange(e: any) {
    setGuess(e.target.value);
  }

  return (
    <>
      <header>
        <div className='again'>
          <button className='btn' onClick={handleGameReset}>
            Again!
          </button>
        </div>
        <div className='between'>
          <p>(Between 1 and 20)</p>
        </div>
        <h1>Guess My Number!</h1>
        <div className='number'>{isGameOver ? secretNumber : '?'}</div>
      </header>
      <main>
        {!isGameOver && (
          <section className='left'>
            <input
              type='text'
              className='guess'
              value={guess}
              onChange={handleGuessChange}
            />
            <button className='btn check' onClick={handleCheck}>
              Check!
            </button>
          </section>
        )}

        <section
          className='right'
          style={{ textAlign: isGameOver ? 'center' : 'unset' }}
        >
          <p className='message'>{message}</p>
          <p className='label-score'>
            💯 Score: <span className='score'>{score}</span>
          </p>
          <p className='label-highscore'>
            🥇 Highscore: <span className='highscore'>{highScore}</span>
          </p>
        </section>
      </main>
    </>
  );
}

export default App;
