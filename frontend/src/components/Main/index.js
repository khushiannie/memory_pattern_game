import { useEffect, useState } from 'react'
import styles from "./style.module.css";
import SingleCard from '../SingleCard.js'
const cardImages=[
  {"src":"/img/1.jpg", matched:false},
  {"src":"img/2.jpg", matched:false},
  {"src":"img/3.png", matched:false},
  {"src":"img/4.jpg", matched:false},
  {"src":"/img/5.jpg", matched:false},
  {"src":"/img/6.jpg", matched:false}
]


function Main() {
  const [cards,setCards]=useState([])
  const [turns,setTurns]=useState(0)
  const [pastGameScore, setPastGameScore] = useState(null);
  const [choiceOne,setChoiceOne]=useState(null)
  const [choiceTwo,setChoiceTwo]=useState(null) 
  const [disabled,setDisabled]=useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
};
 // Function to handle end of the game
 const endGame = () => {
    // Save the current game score
    localStorage.setItem('lastGameScore', JSON.stringify(turns));
    
    // Reset the game (or redirect to home screen)
    alert(`Game Over! You used ${turns} turns.`);
    setTurns(0);
  };

  const shuffleCards = ()=>{
    const shuffledCards=[...cardImages,...cardImages]
    .sort(()=> Math.random()-0.5)
    .map((card)=>({...card,id:Math.random()}))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }
  const handleChoice=(card)=>{
   
   choiceOne ? setChoiceTwo(card) :setChoiceOne(card)
   console.log(choiceOne,choiceTwo)
  }
  useEffect(()=>{
    
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src===choiceTwo.src){
        setCards(prevCards =>{
          return prevCards.map(card =>{
            if(card.src===choiceOne.src){
              return {...card,matched:true}
            }
            else{
              return card
            }
          })
        })
        resetTurn()
      }
      else{
        console.log('not match')
        setTimeout(() => resetTurn(),1000)
      }
    }
  },[choiceOne,choiceTwo])
  console.log(cards)

  const resetTurn =() =>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns+1)
    setDisabled(false)
  }
  useEffect(() => {
    shuffleCards()
    const lastGame = localStorage.getItem('lastGameScore');
    if (lastGame) {
      setPastGameScore(JSON.parse(lastGame));
    }
  }, []);
 
  return (
    <div className={styles.Main}>
    <nav className={styles.navbar}>
               <h1>Pattern Match</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav> 
            {pastGameScore !== null && (
        <div>
          <h4>Last Game:</h4>
          <p>You used {pastGameScore} turns in the last game.</p>
          
        </div>
      )}
       
     <div>
     <button className={styles.button_btn} onClick={shuffleCards}>New Game</button>
     <button className={styles.button_btn} onClick={endGame}>End Game</button>
     </div>
      
      <p> Turns :{turns}</p>
      
      <div className={styles.card_gird}>
        {cards.map(card =>(
          <SingleCard key={card.id} card={card} handleChoice={handleChoice}
          flipped={card===choiceOne || card===choiceTwo || card.matched} disabled={disabled}/>
        ))}
      </div>
      
    </div>
  );
}

export default Main
