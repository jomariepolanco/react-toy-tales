import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

  const renderToyCards = () => {
    props.toyArray.map(toy=> <ToyCard key={toy.id} toyObj={toy}/>)
  }
  return(
    <div id="toy-collection">
      {renderToyCards()}
    </div>
  );
}

export default ToyContainer;
