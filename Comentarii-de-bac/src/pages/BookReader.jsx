import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BOOKS = {
  "amintiri-din-copilarie": {
    path: "/src/data/opere/amintiri_copilarie.json",
    title: "Amintiri din copilărie",
    bookmarkKey: "amintiri_copilarie_bookmark",
    maxWidth: "910px",
    width: "90vw"
  },
  "harap-alb": {
    path: "/src/data/opere/harap-alb.json",
    title: "Harap-Alb",
    bookmarkKey: "harap_alb_bookmark",
    maxWidth: "670px",
    width: "80vw"
  },
  "ion": {
    path: "/src/data/opere/ion.json",
    title: "Ion",
    bookmarkKey: "ion_bookmark",
    maxWidth: "490px",
    width: "80vw"
  },
  "mara": {
    path: "/src/data/opere/mara.json",
    title: "Mara",
    bookmarkKey: "mara_bookmark",
    maxWidth: "920px",
    width: "80vw"
  },
  "baltagul": {
    path: "/src/data/opere/baltagul.json",
    title: "Baltagul",
    bookmarkKey: "baltagul_bookmark",
    maxWidth: "860px",
    width: "80vw"
  },
  "moara-cu-noroc": {
    path: "/src/data/opere/moara-cu-noroc.json",
    title: "Moara cu noroc",
    bookmarkKey: "moara_cu_noroc_bookmark",
    maxWidth: "920px",
    width: "80vw"
  },
  "o-scrisoare-pierduta": {
    path: "/src/data/opere/o_scrisoare_pierduta.json",
    title: "O scrisoare pierdută",
    bookmarkKey: "o_scrisoare_pierduta_bookmark",
    maxWidth: "920px",
    width: "80vw"
  },
  "ultima-noapte-dragoste": {
    path: "/src/data/opere/ultima-noapte-dragoste.json",
    title: "Ultima noapte de dragoste, intiia noapte de razboi",
    bookmarkKey: "ultima_noapte_dragoste_bookmark",
    maxWidth: "600px",
    width: "80vw"
  },
};

export default function BookReader() {
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageInput, setPageInput] = useState("");
  const [showBookmarkConfirm, setShowBookmarkConfirm] = useState(false);
  const [bookmarkedPage, setBookmarkedPage] = useState(null);
  const [currentBook, setCurrentBook] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Detect book from URL
    const pathParts = location.pathname.split('/');
    const bookSlug = pathParts[pathParts.length - 1];
    const bookConfig = BOOKS[bookSlug];
    
    if (!bookConfig) {
      console.error('Book not found:', bookSlug);
      return;
    }

    setCurrentBook(bookConfig);

    fetch(bookConfig.path)
      .then(res => res.json())
      .then(data => {
        setPages(data);
        const saved = Number(localStorage.getItem(bookConfig.bookmarkKey));
        if (!isNaN(saved) && saved >= 0 && saved < data.length) {
          setPage(saved);
          setBookmarkedPage(saved);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading book:', error);
        setLoading(false);
      });
  }, [location.pathname]);

  useEffect(() => {
    if (!loading && currentBook) {
      localStorage.setItem(currentBook.bookmarkKey, page);
    }
  }, [page, loading, currentBook]);

  const goBack = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate(-1);
    }
  };

  const handlePageInputChange = (e) => {
    setPageInput(e.target.value);
  };

  const handlePageInputSubmit = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(pageInput) - 1; // Convert to 0-based index
    if (pageNumber >= 0 && pageNumber < pages.length) {
      setPage(pageNumber);
      setPageInput("");
    }
  };

  const handleBookmarkClick = () => {
    setShowBookmarkConfirm(true);
  };

  const confirmBookmark = () => {
    if (currentBook) {
      localStorage.setItem(currentBook.bookmarkKey, page);
      setBookmarkedPage(page);
    }
    setShowBookmarkConfirm(false);
  };

  const cancelBookmark = () => {
    setShowBookmarkConfirm(false);
  };

  const removeBookmark = () => {
    if (currentBook) {
      localStorage.removeItem(currentBook.bookmarkKey);
      setBookmarkedPage(null);
    }
    setShowBookmarkConfirm(false);
  };

  if (loading) return <div>Se încarcă cartea...</div>;
  if (!pages.length || !currentBook) return <div>Cartea nu a putut fi încărcată.</div>;

  return (
    <div className="book-reader-wrapper">
      {bookmarkedPage !== null && (
        <div className="book-reader-bookmark-indicator">
          <div className="bookmark-icon">🔖</div>
          <span className="bookmark-text">Pagina {bookmarkedPage + 1}</span>
        </div>
      )}
      <div className="book-reader-header">
        <button className="book-reader-back" onClick={goBack}>Înapoi</button>
        <button 
          className="book-reader-bookmark-btn" 
          onClick={handleBookmarkClick}
        >
          {bookmarkedPage === page ? "Pagina fixată" : "Salvează pagina curentă"}
        </button>
        <span className="book-reader-title">{currentBook.title}</span>
      </div>
      <div 
        className="book-reader"
        style={{
          maxWidth: currentBook.maxWidth,
          width: currentBook.width
        }}
      >
        <div className="book-reader-content">
          <div className="book-reader-page">{pages[page]}</div>
        </div>
        <div className="book-reader-controls">
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>Prev</button>
          <form onSubmit={handlePageInputSubmit} className="book-reader-page-input-form">
            <input
              type="number"
              min="1"
              max={pages.length}
              value={pageInput}
              onChange={handlePageInputChange}
              placeholder={`${page + 1}`}
              className="book-reader-page-input"
            />
            <span className="book-reader-page-separator">/</span>
            <span className="book-reader-total-pages">{pages.length}</span>
          </form>
          <button onClick={() => setPage(p => Math.min(pages.length - 1, p + 1))} disabled={page === pages.length - 1}>Next</button>
        </div>
      </div>
      
      {showBookmarkConfirm && (
        <div className="book-reader-confirm-overlay" onClick={cancelBookmark}>
          <div className="book-reader-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Fixare pagină</h3>
            <p>Vrei să fixezi pagina {page + 1} ca pagina curentă?</p>
            <div className="book-reader-confirm-buttons">
              <button onClick={confirmBookmark} className="book-reader-confirm-btn">
                Da, fixează
              </button>
              {bookmarkedPage !== null && (
                <button onClick={removeBookmark} className="book-reader-remove-btn">
                  Anulează fixarea
                </button>
              )}
              <button onClick={cancelBookmark} className="book-reader-cancel-btn">
                Anulează
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
