function Grid({ value, handleTileClick }) {
  const { isFlipped, isPaired } = value;
  //   console.log(value);
  return (
    <button
      className={`${
        isFlipped && isPaired
          ? "h-16 w-16  text-white border rounded-lg box-border bg-green-400"
          : "h-16 w-16  bg-slate-400 text-white border rounded-lg box-border bg-blue-400"
      } `}
      onClick={() => handleTileClick(value)}
    >
      {isFlipped ? value.val : " "}
    </button>
  );
}
export default Grid;
