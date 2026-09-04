export function SearchBar({ onSearch }) {
    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Buscar productos..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
        </div>
    );
}