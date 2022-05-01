import PokemonCard from "../../../../../../components/Pokemon-card/card";
import {useState} from "react";
import cn from "classnames"

import s from "./style.module.css";

const PlayerBoard = ({player,cards, onClickCard}) => {
    const [isSelected, setSelected] = useState(null);
  return(
      <>
          {
              cards.map((item) => (
                  <div className={cn(s.cardBoard,
                      {
                          [s.selected]: isSelected ===item.id

                      })}
                  onClick={() => {
                      onClickCard && onClickCard({
                          player,
                          ...item,
                      })
                      setSelected(item.id)
                  }}
                  >
                      <PokemonCard
                          key={item.id}
                          name={item.name}
                          id={item.id}
                          isActive
                          isSelected={item.selected}
                          img={item.img}
                          type={item.type}
                          values={item.values}
                          minimize
                      />
                  </div>
              ))
          }
      </>
  )
}

export default PlayerBoard;