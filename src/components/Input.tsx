const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type="text"
      className="bg-black/30 rounded-2xl p-4 w-full font-audiowide placeholder:font-audiowide text-white"
      {...props}
    />
  );
};

export default Input;
