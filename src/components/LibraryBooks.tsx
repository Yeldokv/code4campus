import React, { useState } from 'react';
import { Book, Search, Filter, BookOpen, CheckCircle, XCircle } from 'lucide-react';

interface LibraryBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  location: string;
  publisher: string;
  year: number;
}

const books: LibraryBook[] = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    isbn: '978-0262033848',
    category: 'Computer Science',
    totalCopies: 5,
    availableCopies: 2,
    location: 'CS Section - Shelf A3',
    publisher: 'MIT Press',
    year: 2009
  },
  {
    id: '2',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '978-0132350884',
    category: 'Software Engineering',
    totalCopies: 3,
    availableCopies: 0,
    location: 'CS Section - Shelf B1',
    publisher: 'Prentice Hall',
    year: 2008
  },
  {
    id: '3',
    title: 'Calculus: Early Transcendentals',
    author: 'James Stewart',
    isbn: '978-1285741550',
    category: 'Mathematics',
    totalCopies: 8,
    availableCopies: 5,
    location: 'Math Section - Shelf M2',
    publisher: 'Cengage Learning',
    year: 2015
  },
  {
    id: '4',
    title: 'Physics for Scientists and Engineers',
    author: 'Raymond A. Serway',
    isbn: '978-1133947271',
    category: 'Physics',
    totalCopies: 6,
    availableCopies: 1,
    location: 'Physics Section - Shelf P4',
    publisher: 'Cengage Learning',
    year: 2013
  },
  {
    id: '5',
    title: 'Organic Chemistry',
    author: 'Paula Yurkanis Bruice',
    isbn: '978-0321803221',
    category: 'Chemistry',
    totalCopies: 4,
    availableCopies: 3,
    location: 'Chemistry Section - Shelf C2',
    publisher: 'Pearson',
    year: 2016
  },
  {
    id: '6',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0743273565',
    category: 'Literature',
    totalCopies: 10,
    availableCopies: 7,
    location: 'Literature Section - Shelf L1',
    publisher: 'Scribner',
    year: 2004
  }
];

const LibraryBooks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');

  const categories = [...new Set(books.map(book => book.category))];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const matchesAvailability = availabilityFilter === 'all' ||
                               (availabilityFilter === 'available' && book.availableCopies > 0) ||
                               (availabilityFilter === 'unavailable' && book.availableCopies === 0);
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Book className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Library Book Availability</h1>
          <p className="text-gray-400">Search and check availability of library books</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Books</option>
              <option value="available">Available</option>
              <option value="unavailable">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-750 border-b border-gray-700">
              <tr>
                <th className="text-left p-4 text-gray-300 font-semibold">Book Details</th>
                <th className="text-left p-4 text-gray-300 font-semibold">Category</th>
                <th className="text-left p-4 text-gray-300 font-semibold">Location</th>
                <th className="text-left p-4 text-gray-300 font-semibold">Availability</th>
                <th className="text-left p-4 text-gray-300 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr key={book.id} className={`border-b border-gray-700 hover:bg-gray-750 transition-colors ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-825'}`}>
                  <td className="p-4">
                    <div>
                      <h3 className="text-white font-semibold mb-1">{book.title}</h3>
                      <p className="text-gray-400 text-sm mb-1">by {book.author}</p>
                      <p className="text-gray-500 text-xs">ISBN: {book.isbn}</p>
                      <p className="text-gray-500 text-xs">{book.publisher}, {book.year}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded font-medium">
                      {book.category}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">{book.location}</td>
                  <td className="p-4">
                    <div className="text-gray-300">
                      <span className="font-semibold">{book.availableCopies}</span> of <span className="text-gray-400">{book.totalCopies}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          book.availableCopies > 0 ? 'bg-green-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${(book.availableCopies / book.totalCopies) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="p-4">
                    {book.availableCopies > 0 ? (
                      <div className="flex items-center space-x-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Available</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-red-400">
                        <XCircle className="w-5 h-5" />
                        <span className="font-medium">Out of Stock</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No books found matching your search criteria.</p>
        </div>
      )}

      {/* Library Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-blue-400 mb-1">{books.length}</div>
          <div className="text-gray-400 text-sm">Total Books</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-green-400 mb-1">
            {books.filter(book => book.availableCopies > 0).length}
          </div>
          <div className="text-gray-400 text-sm">Available</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-purple-400 mb-1">{categories.length}</div>
          <div className="text-gray-400 text-sm">Categories</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-yellow-400 mb-1">
            {books.reduce((sum, book) => sum + book.totalCopies, 0)}
          </div>
          <div className="text-gray-400 text-sm">Total Copies</div>
        </div>
      </div>
    </div>
  );
};

export default LibraryBooks;