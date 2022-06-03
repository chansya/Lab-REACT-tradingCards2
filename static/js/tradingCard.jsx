function TradingCard(props) {
  return (
    <div className="card">
      <p>Name: {props.name}</p>
      <img src={props.imgUrl} alt="profile" />
      <p>Skill: {props.skill} </p>
    </div>
  );
}

function AddTradingCard(props) {
  const [name, setName] = React.useState("");
  const [skill, setSkill] = React.useState("");
  function addNewCard() {
    // TO BE IMPLEMENTED
    fetch('/add-card',{
      method: 'POST',
      body: JSON.stringify({'name':name,'skill':skill}),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(response => response.json())
      .then(jsonResponse =>{
        alert(`Success: ${jsonResponse.cardAdded.name} card is added`)
        const cardAdded = jsonResponse.cardAdded;
        props.addCard(cardAdded);
      });
  }
  return (
    <React.Fragment>
      <h2>Add New Trading Card</h2>
      <label htmlFor="nameInput">Name</label>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        id="nameInput"
        style={{ marginLeft: "5px" }}
      ></input>
      <label
        htmlFor="skillInput"
        style={{ marginLeft: "10px", marginRight: "5px" }}
      >
        Skill
      </label>
      <input
        value={skill}
        onChange={(event) => setSkill(event.target.value)}
        id="skillInput"
      ></input>
      <button style={{ marginLeft: "10px" }} onClick={addNewCard}>
        Add
      </button>
    </React.Fragment>
  );
}

function TradingCardContainer() {
  // set cards to empty array as initial value, then when data is fetched
  // update cards using setCards
  const [cards, setCards] = React.useState([])
  
  function addCard(newCard) {
    // [...cards] makes a copy of cards. Similar to currentCards = cards[:] in Python
    const currentCards = [...cards];
    // [...currentCards, newCard] is an array containing all elements in currentCards followed by newCard
    setCards([...currentCards, newCard]);
  }

  // more code here...  
  // run once when the page is rendered, make AJAX request to get card list
  React.useEffect(() => {
    fetch('/cards.json')
      .then((response) => response.json())
      .then((result) => 
        setCards(result.cards))
      }, [])

  const tradingCards = [];

  for (const currentCard of cards) {
    tradingCards.push(
      <TradingCard
        name={currentCard.name}
        skill={currentCard.skill}
        imgUrl={currentCard.imgUrl}
      />,
    );
  }

  return (
    <React.Fragment>
      <AddTradingCard addCard={addCard} />
      <h2>Trading Cards</h2>
      <div className="grid">{tradingCards}</div>
    </React.Fragment>
  );
}

ReactDOM.render(<TradingCardContainer />, document.getElementById('container'));
