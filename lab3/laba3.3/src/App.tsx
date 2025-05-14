import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const books = [
  { id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1937, isbn: '978-0261102217' },
  { id: 2, title: '1984', author: 'George Orwell', genre: 'Dystopia', year: 1949, isbn: '978-0451524935' },
  { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', year: 1813, isbn: '978-0141439518' },
  { id: 4, title: 'Dune', author: 'Frank Herbert', genre: 'Science Fiction', year: 1965, isbn: '978-0441172719' },
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction', year: 1951, isbn: '978-0316769488' },
  { id: 6, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', year: 1960, isbn: '978-0446310789' },
];

interface SortableTableProps {
  data: Array<Record<string, string | number>>;
}

function SortableTable({ data }: SortableTableProps) {
  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedArray = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setSortedData(sortedArray);
    setSortConfig({ key, direction });
  };

  return (
    <div className="container mt-4 bg-light p-3 rounded">
      <table className="table table-success table-light">
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key} onClick={() => handleSort(key)} style={{ cursor: 'pointer' }}>
                {key} {sortConfig.key === key ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <SortableTable data={books} />
    </div>
  );
}

export default App;