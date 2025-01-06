function Grid({ value, handleTileClick }) {
  const { isFlipped, isPaired } = value;
  //   console.log(value);
  return (
    <button
      className={`${
        isFlipped && !isPaired
          ? "h-16 w-16  text-black font-bold border rounded-lg box-border bg-blue-400"
          : isFlipped && isPaired
          ? "h-16 w-16  text-white font-bold border rounded-lg box-border bg-green-500"
          : "h-16 w-16  bg-[#fca311] text-black font-bold border rounded-lg box-border"
      } `}
      onClick={() => handleTileClick(value)}
      disabled={isFlipped && isPaired ? true : false}
    >
      {isFlipped ? value.val : " "}
    </button>
  );
}
export default Grid;
