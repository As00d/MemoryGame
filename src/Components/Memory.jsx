import { useEffect, useState } from "react";
import Grid from "./Grid";

const array = [
  { val: 1, id: 1, isFlipped: false, isPaired: false },
  { val: 2, id: 2, isFlipped: false, isPaired: false },
  { val: 3, id: 3, isFlipped: false, isPaired: false },
  { val: 4, id: 4, isFlipped: false, isPaired: false },
  { val: 1, id: 5, isFlipped: false, isPaired: false },
  { val: 2, id: 6, isFlipped: false, isPaired: false },
  { val: 3, id: 7, isFlipped: false, isPaired: false },
  { val: 4, id: 8, isFlipped: false, isPaired: false },
];
function Memory() {
  const [inputNumber, setInputNumber] = useState(0);
  const [tile1, setTile1] = useState(null);
  const [tile2, setTile2] = useState(null);
  const [data, setData] = useState(array);

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
          setData((prevData) => {
            let updatedData = flipValue(tile1, prevData);
            updatedData = flipValue(tile2, updatedData);
            return updatedData;
          });

          setTile1((prev) => null);
          setTile2((prev) => null);
        }
      } else {
      }
    },
    [tile1, tile2]
  );
  return (
    <div className="bg-slate-100 h-screen flex flex-col border justify-center items-center">
      <div className="p-4 m-2 max-w-96 shadow-2xl bg-slate-300 h-96">
        <div className="flex flex-col items-center p-4">
          <h1 className="text-3xl font-bold my-2">Memory Game</h1>
          <form className="my-2">
            <label htmlFor=""> Grid size: </label>
            <input
              type="number"
              name=""
              id=""
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
          <button className="bg-orange-400 p-2 rounded text-white hover:bg-orange-600">
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}
export default Memory;
