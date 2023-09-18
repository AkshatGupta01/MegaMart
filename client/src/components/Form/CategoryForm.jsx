const CategoryForm = ({ handleSubmit, name, setName }) => {
  return (
    <form onSubmit={handleSubmit} className="w-full my-2">
      <input
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter Category name"
        name="categoryName"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <button
        type="Submit"
        className="my-2 py-2 px-4 bg-blue-600 rounded-lg text-white hover:bg-blue-500 focus:bg-blue-800"
      >
        Add
      </button>
    </form>
  );
};

export default CategoryForm;
