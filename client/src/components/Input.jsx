export const Input = ({ title, name, type, placeholder, value = '', handleInputChange }) => {
  return (
    <>
      <div className='py-2'>
        <span className='mb-2 text-md'>{title}</span>
        <input
          type={type}
          className='w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500'
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};
