import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { generateUrl, getAllFlikUrls, deleteUrl } from '../api/urlApi';

const Home = () => {
  const { user } = useAuth();
  const [originalUrl, setOriginalUrl] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [flikUrls, setFlikUrls] = useState([]);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const fetchFlikUrls = async () => {
      try {
        const data = await getAllFlikUrls();
        setFlikUrls(data);
      } catch (err) {
        setFetchError('Failed to fetch your shortened URLs.');
      }
    };
    fetchFlikUrls();
  }, [generatedUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setGeneratedUrl('');
    setIsLoading(true);

    try {
      const data = await generateUrl(originalUrl);
      setGeneratedUrl(data.generatedUrl);
      setOriginalUrl('');
    } catch (err) {
      setError('Failed to generate URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (flikkedUrl) => {
    const id = flikkedUrl.split('/r/')[1];
    try {
      await deleteUrl(id);
      setFlikUrls((prev) => prev.filter((url) => url.flikkedUrl !== flikkedUrl));
    } catch (err) {
      setFetchError('Failed to delete URL. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-red-50 pt-24 flex flex-col items-center px-4">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-2xl shadow-xl transform transition-all hover:shadow-2xl mb-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            <span className="bg-gradient-to-r from-red-500 to-red-700 text-transparent bg-clip-text">Flik</span> Your Links
          </h1>
          <p className="mt-2 text-lg text-gray-500">Shorten URLs in a snap</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="original-url" className="sr-only">Original URL</label>
            <input
              id="original-url"
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://example.com"
              className="appearance-none rounded-xl relative block w-full px-4 py-3 bg-gray-50 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-500 transition duration-200 text-lg"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-center text-sm animate-pulse">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-all duration-300"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z" />
                </svg>
                Generating...
              </span>
            ) : (
              'Generate Short URL'
            )}
          </button>
        </form>

        {generatedUrl && (
          <div className="mt-6 text-center animate-fade-in">
            <p className="text-lg text-gray-600 font-medium">Your Shortened URL:</p>
            <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <a
                href={generatedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-500 font-semibold break-all transition duration-200"
              >
                {generatedUrl}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-5xl p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Your Fliked URLs</h2>
        {fetchError && (
          <div className="text-red-500 text-center mb-6 text-sm animate-pulse">
            {fetchError}
          </div>
        )}
        {flikUrls.length === 0 ? (
          <p className="text-gray-500 text-center text-lg italic">No URLs shortened yet—start flikking!</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-red-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-700 uppercase tracking-wider">Original URL</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-700 uppercase tracking-wider">Short URL</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-700 uppercase tracking-wider">Created At</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-700 uppercase tracking-wider">Clicks</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-700 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {flikUrls.map((url, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-6 py-4 text-sm text-gray-900 break-all">
                      <a
                        href={url.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-500 hover:underline"
                      >
                        {url.originalUrl.length > 50 ? `${url.originalUrl.substring(0, 50)}...` : url.originalUrl}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <a
                        href={url.flikkedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-500 hover:underline font-medium"
                      >
                        {url.flikkedUrl}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(url.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {url.clickCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <button
                        onClick={() => handleDelete(url.flikkedUrl)}
                        className="text-red-600 hover:text-red-800 focus:outline-none transition duration-200"
                        title="Delete URL"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Home;