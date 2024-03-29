import React, {useState} from 'react';
import './App.css';
import Board from "./Board";

const App: React.FC = () => {

    const initialTiles = [1,5,9,13,2,6,10,14,3,7,11,15,4,8,12,0];

    const [tiles, setTiles] = useState(initialTiles);

    //перемешивание игровых
    const shuffledTiles = () => {
        const shuffledTiles = [...initialTiles] // копия массива

        for(let i = shuffledTiles.length -1; i > 0; i--) {
            const randomNumber = Math.floor(Math.random() * (i + 1));

             [shuffledTiles[i], shuffledTiles[randomNumber]] = [shuffledTiles[randomNumber],shuffledTiles[i]]
            //деструктурирующая присваивание происходит обмен значениями
        }
        setTiles(shuffledTiles)
    }




    //клик по игровой плитке

    const handleTileClick = (index: number) => {
        if(canMoveTile(index)) {

            const newTiles = [...tiles]; //копия массива
            const emptyIndex = newTiles.indexOf(0);
            [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
            setTiles(newTiles);

            // если игра закончилась, то надпись
            if(isGameComplete(newTiles)) {
                alert('Congrats, you won')
            }
        }
    }

    //функция перемещения на пустой (не занятый) индекс

const canMoveTile = (index: number) => {
    const emptyIndex = tiles.indexOf(0);
    const row = Math.floor(emptyIndex / 4);

    return (
        (index === emptyIndex -4 && row > 0) ||
        (index === emptyIndex +4 && row < 3) ||
        (index === emptyIndex -1 && index % 4 !== 3) ||
        (index === emptyIndex +1 && index % 4 !== 0)
    )

}

    const isGameComplete = (currentTiles: number[]) => {
        for (let i = 0; i < currentTiles.length; i++) {
            if (currentTiles[i] !== i + 1) {
                return false;
            }
        }
        return true;
    };


    return (
        <div className="App" style={{textAlign: 'center'}}>
           <strong style={{fontSize: '4rem'}}>15 PUZZLE</strong>


            <div style={{textAlign: "center", marginBottom: '30px'}}>
                <button className='button'  onClick={ shuffledTiles } >Shuffle</button>
            </div>

            {/*передаем пропсы*/}
            <Board
                tiles={tiles}
                onTileClick={handleTileClick}
            />


        </div>
    );
}

export default App;
