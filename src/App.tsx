import { Product, useProductSearch, Button } from "@shopify/shop-minis-react";
import { useCallback, useEffect, useState } from "react";

type SearchResult = {
  timestamp: number;
  products: Product[];
};

export function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { products, error } = useProductSearch({
    query: searchQuery,
    skip: !searchQuery,
    first: 2,
  });

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (products) {
      setSearchResults([...searchResults, { timestamp: Date.now(), products }]);
    }
  }, [products]);

  const runSearch = useCallback(() => {
    setSearchQuery("t-shirt");
  }, [setSearchQuery]);

  const resetSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
  }, [setSearchQuery, setSearchResults]);

  return (
    <div className="pt-12 px-4 pb-6">
      {searchQuery === "" ? (
        <Button onClick={runSearch}>Run "t-shirt" search</Button>
      ) : (
        <Button onClick={resetSearch}>Reset</Button>
      )}
      <h2>Results over time:</h2>
      {error && <p>Error: {error.message}</p>}
      {searchResults.map((result, index) => (
        <div
          key={`result-${index}`}
          className="border border-gray-200 p-4 mb-4"
        >
          <p>Timestamp: {result.timestamp}</p>
          <ol className="list-decimal list-inside">
            {result.products.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
