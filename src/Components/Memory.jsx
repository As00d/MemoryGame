import { useEffect, useState } from "react";
import Grid from "./Grid";

function createArray(inputNumber) {
  let numberOfTiles = inputNumber * inputNumber;
  numberOfTiles = numberOfTiles % 2 ? numberOfTiles - 1 : numberOfTiles;

  const values = [];
  for (let i = 1; i <= numberOfTiles / 2; i++) {
    values.push(i, i);
  }
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }
  const array = values.map((val, index) => ({
    val,
    id: index + 1,
    isFlipped: false,
    isPaired: false,
  }));
  return array;
}

function Memory() {
  const [inputNumber, setInputNumber] = useState(2);
  const [tile1, setTile1] = useState(null);
  const [tile2, setTile2] = useState(null);
  const [data, setData] = useState([]);

  useEffect(
    function () {
      const arr = createArray(inputNumber);
      setData(arr);
    },
    [inputNumber]
  );

  useEffect(
    function () {
      if (tile1 && tile2 && tile1.val == tile2.val) {
        setData((prevData) => {
          let updatedData = pairValue(tile1, prevData);
          updatedData = pairValue(tile2, updatedData);
          return updatedData;
        });
        setTile1(null);
        setTile2(null);
      } else if (tile1 && tile2 && tile1.val != tile2.val) {
        if (tile1.isFlipped && tile2.isFlipped) {
          setTimeout(() => {
            setData((prevData) => {
              let updatedData = flipValue(tile1, prevData);
              updatedData = flipValue(tile2, updatedData);
              return updatedData;
            });
          }, 750);

          setTile1((prev) => null);
          setTile2((prev) => null);
        }
      } else {
      }
    },
    [tile1, tile2]
  );

  function flipValue(input, currentData) {
    const recentData = currentData.map((item) =>
      item.val === input.val && item.id === input.id
        ? { ...item, isFlipped: !item.isFlipped }
        : item
    );
    return recentData;
  }

  function pairValue(input, currentData) {
    const recentData = currentData.map((item) =>
      item.val === input.val && item.id === input.id
        ? { ...item, isPaired: !item.isPaired }
        : item
    );
    return recentData;
  }

  function handleTileClick(value) {
    if (!tile1) {
      setData(() => flipValue(value, data));
      setTile1({ ...value, isFlipped: !value.isFlipped });
    } else if (tile1 && !tile2) {
      setData(() => flipValue(value, data));
      setTile2({ ...value, isFlipped: !value.isFlipped });
    }
  }

  function handleReset() {
    setData(createArray(2));
    setInputNumber(2);
  }

  return (
    <div className="bg-[#14213d] min-h-screen flex flex-col justify-center items-center">
      <div className="p-4 m-2 max-w-4xl shadow-2xl bg-[#e5e5e5] rounded-xl min-h-[560px] min-w-[200px]">
        <div className="flex flex-col items-center p-4">
          <h1 className="text-4xl my-2">Memory Game</h1>
          <form className="my-2">
            <label htmlFor=""> Grid size: </label>
            <input
              type="number"
              name=""
              id=""
              max={10}
              min={2}
              value={inputNumber}
              onChange={(e) => setInputNumber(e.target.value)}
              className="w-16 border-slate-700 rounded px-2 py-1"
            />
          </form>
          <div className="flex p-2 my-2 flex-wrap justify-center">
            {data.map((value) => {
              return (
                <Grid
                  value={value}
                  key={value.id}
                  handleTileClick={handleTileClick}
                />
              );
            })}
          </div>
          <button
            className="bg-[#14213d] p-3 rounded text-white shadow-2xl"
            onClick={handleReset}
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}
export default Memory;
