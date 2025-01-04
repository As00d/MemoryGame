function Grid({ value, handleTileClick }) {
  const flipped = value.isFlipped;
  //   console.log(value);
  return (
    <button
      className={`${
        flipped
          ? "h-16 w-16  bg-slate-400 text-white border rounded-lg box-border bg-blue-400"
          : "h-16 w-16  bg-slate-400 text-white border rounded-lg box-border"
      } `}
      onClick={() => handleTileClick(value)}
    >
      {flipped ? value.val : " "}
    </button>
  );
}
export default Grid;
