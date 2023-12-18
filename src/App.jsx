import React, { useState, useEffect } from 'react';
import Background from './components/backgrounder';
import Success from './components/success';
import Table from './components/table'
import cup from './assets/daacup.webp';
import cross from './assets/daacross.webp';
import './App.css';

const n = 7; 
const autoSolveDelay = 250;

const App = () => {
  
  const [hidingSpots, setHidingSpots] = useState(new Array(n).fill(false));
  const [target, setTarget] = useState(0);
  const [attemptLog, setAttemptLog] = useState(Array.from({ length: n }, () => []));
  const [autoSolve, setAutoSolve] = useState(false);
  const [autoSolveIndex, setAutoSolveIndex] = useState(1);
  const [autoSolveDirection, setAutoSolveDirection] = useState(1);

  const [isSuccess,setIsSuccess]=useState(false);

  const [isButtonPressed,setIsButtonPressed]=useState(false);

  const [repeat,setRepeat]=useState(false);

  const generate = () => {
    const newHidingSpots = new Array(n).fill(false);
    const newTarget = Math.floor(Math.random() * n);
    newHidingSpots[newTarget] = true;

    setHidingSpots(newHidingSpots);
    setTarget(newTarget);
  };

  
  

  const handleImageClick = (index) => {
    if (autoSolve) {
      alert('AUTO SOLVER is active. Please wait for it to finish.');
    } else {
      shoot(index);
    }
  };


  const targetSelect = (end = false) => {
    if (end) {
      alert('Game Over');
    } else {
      if (autoSolve) {
        console.log(autoSolveIndex)

        if (autoSolveDirection === 1 && autoSolveIndex < n - 2) {
          setAutoSolveIndex(prevIndex => prevIndex + 1); 
          shoot(autoSolveIndex);
        }else if(repeat){
          setAutoSolveIndex(prevIndex => prevIndex - 1); 
          setRepeat(false);
          shoot(autoSolveIndex); 
        }else if (autoSolveIndex === n - 2) {
          
          setRepeat(true);
          setAutoSolveIndex(n - 2);
          setAutoSolveDirection(-1);
          shoot(autoSolveIndex); 

        }else if (autoSolveIndex == 1 && autoSolveDirection === -1){
          shoot(autoSolveIndex); 
         }
         else if (autoSolveDirection === -1 && autoSolveIndex > 0) {
          setAutoSolveIndex(prevIndex => prevIndex - 1); 
          shoot(autoSolveIndex); 
        }
      }
    }
  };
  

  const shoot = (x) => {
    const newAttemptLog = attemptLog.map((log, i) => (i === x ? [...log, true] : [...log, false]));
    if (hidingSpots[x]) {
      setTimeout(() => {
        setAttemptLog(newAttemptLog);

      

        setIsSuccess(true);



        generate();


        
        setAutoSolve(false);
        setAutoSolveDirection(1);
        setAutoSolveIndex(1);
        setAttemptLog(Array.from({ length: n }, () => []))
        setTarget(Math.floor(Math.random() * n));
        setHidingSpots(new Array(n).fill(false))

      }, autoSolve ? autoSolveDelay : 0);
      return true;
    } else {
      const newHidingSpots = [...hidingSpots];
      newHidingSpots[target] = false;
  
      let newTarget = target + (Math.random() < 0.5 ? 1 : -1);
      newTarget = newTarget === -1 ? newTarget + 2 : newTarget === n ? newTarget - 2 : newTarget;
      newHidingSpots[newTarget] = true;
  
      setIsSuccess(false);
      setTimeout(() => {
        setHidingSpots(newHidingSpots);
        setAttemptLog(newAttemptLog);        
        console.log('Miss!');
      }, autoSolve ? autoSolveDelay : 0);
  
      return false;
    }
  };
  

  useEffect(() => {
    generate();
  }, []);

  useEffect(() => {
    targetSelect();
  }, [hidingSpots]);


  useEffect(() => {
    if (autoSolve) {
      targetSelect();
    }
  }, [autoSolve]);

  const handleAutoSolveClick = () => {
    setAutoSolve(true);
    setIsButtonPressed(true);
  };


  return (
    <>
      <Background />
      <div className="item">
        {[...Array(n)].map((_, index) => (
          <div className={`daa-div`} key={index} onClick={() => handleImageClick(index)}>

            <img src={cup} alt="" />

            {autoSolve && autoSolveIndex === index && (
              <img className='autosolve-crosshair' src={cross} alt="" />
            )}
            
          </div>
        ))}
      </div>
      <button onClick={handleAutoSolveClick} className='autosolver'>
          Auto Solve
      </button>
      <Table />
      <Success isSuccess={isSuccess} isButtonPressed={isButtonPressed}/>
    </>

  );
};

export default App;
