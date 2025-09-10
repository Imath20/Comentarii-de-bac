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
  "luceafarul": {
    path: "/src/data/opere/luceafarul.json",
    title: "Lucefarul",
    bookmarkKey: "luceafarul_bookmark",
    maxWidth: "600px",
    width: "80vw"
  },
  "enigma-otiliei": {
    path: "/src/data/opere/enigma-otiliei.json",
    title: "Enigma Otiliei",
    bookmarkKey: "enigma-otiliei_bookmark",
    maxWidth: "600px",
    width: "80vw"
  },
  "riga-crypto": {
    path: "/src/data/opere/riga-crypto.json",
    title: "Riga Crypto şi Lapona Enigel",
    bookmarkKey: "riga-crypto_bookmark",
    maxWidth: "650px",
    width: "80vw"
  },
  "morometii": {
    path: "/src/data/opere/morometii.json",
    title: "Moromeţii",
    bookmarkKey: "morometii_bookmark",
    maxWidth: "600px",
    width: "80vw"
  },
  "iona": {
      path: "/src/data/opere/iona.json",
      title: "Iona",
      bookmarkKey: "iona_bookmark",
      maxWidth: "600px",
      width: "80vw"
    },
  "critice": {
    path: "/src/data/opere/critice.json",
    title: "Critice",
    bookmarkKey: "critice_bookmark",
    maxWidth: "800px",
    width: "80vw"
  },
  "lapusneanu": {
    path: "/src/data/opere/lapusneanu.json",
    title: "Alexandru Lăpuşneanu",
    bookmarkKey: "lapusneanu_bookmark",
    maxWidth: "950px",
    width: "80vw"
  },
  "rascoala": {
    path: "/src/data/opere/rascoala.json",
    title: "Rascoala",
    bookmarkKey: "rascoala_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "hanul-ancutei": {
    path: "/src/data/opere/hanul-ancutei.json",
    title: "Hanul Ancutiei",
    bookmarkKey: "hanul-ancutei_bookmark",
    maxWidth: "730px",
    width: "80vw"
  },
  "maitreyi": {
    path: "/src/data/opere/maitreyi.json",
    title: "Maitreyi",
    bookmarkKey: "maitreyi_bookmark",
    maxWidth: "520px",
    width: "80vw"
  },
  "nunta-in-cer": {
    path: "/src/data/opere/nunta-in-cer.json",
    title: "Nunta in cer",
    bookmarkKey: "nunta-in-cer_bookmark",
    maxWidth: "500px",
    width: "80vw"
  },
  // Added missing books from data/opere
  "amintiri-de-la-junimea-din-iasi": {
    path: "/src/data/opere/amintiri-de-la-junimea-din-iasi.json",
    title: "Amintiri de la Junimea din Iași",
    bookmarkKey: "amintiri-de-la-junimea-din-iasi_bookmark",
    maxWidth: "520px",
    width: "80vw",

    widthRules: [
      { spec: "603-", maxWidth: "600px"}
    ]
  },
  "amintiri-din-junimea": {
    path: "/src/data/opere/amintiri-din-junimea.json",
    title: "Amintiri din Junimea",
    bookmarkKey: "amintiri-din-junimea_bookmark",
    maxWidth: "550px",
    width: "80vw"
  },
  "bubico": {
    path: "/src/data/opere/bubico.json",
    title: "Bubico",
    bookmarkKey: "bubico_bookmark",
    maxWidth: "750px",
    width: "80vw"
  },
  "capra-cu-trei-iezi": {
    path: "/src/data/opere/capra-cu-trei-iezi.json",
    title: "Capra cu trei iezi",
    bookmarkKey: "capra-cu-trei-iezi_bookmark",
    maxWidth: "700px",
    width: "80vw"
  },
  "danila-prepeleac": {
    path: "/src/data/opere/danila-prepeleac.json",
    title: "Dănilă Prepeleac",
    bookmarkKey: "danila-prepeleac_bookmark",
    maxWidth: "830px",
    width: "80vw"
  },
  "i-l-caragiale-dl-goe": {
    path: "/src/data/opere/i-l-caragiale-dl-goe.json",
    title: "Dl. Goe",
    bookmarkKey: "i-l-caragiale-dl-goe_bookmark",
    maxWidth: "750px",
    width: "80vw"
  },
  "i-l-caragiale-vizita": {
    path: "/src/data/opere/i-l-caragiale-vizita.json",
    title: "Vizită",
    bookmarkKey: "i-l-caragiale-vizita_bookmark",
    maxWidth: "740px",
    width: "80vw"
  },
  "la-tiganci": {
    path: "/src/data/opere/la-tiganci.json",
    title: "La Țigănci",
    bookmarkKey: "la-tiganci_bookmark",
    maxWidth: "600px",
    width: "80vw"
  },
  "o-noapte-furtunoasa": {
    path: "/src/data/opere/o-noapte-furtunoasa.json",
    title: "O noapte furtunoasă",
    bookmarkKey: "o-noapte-furtunoasa_bookmark",
    maxWidth: "500px",
    width: "80vw"
  },
  "padurea-spanzuratilor": {
    path: "/src/data/opere/padurea-spanzuratilor.json",
    title: "Pădurea spânzuraților",
    bookmarkKey: "padurea-spanzuratilor_bookmark",
    maxWidth: "500px",
    width: "80vw"
  },
  "patul-lui-procust": {
    path: "/src/data/opere/patul-lui-procust.json",
    title: "Patul lui Procust",
    bookmarkKey: "patul-lui-procust_bookmark",
    maxWidth: "850px",
    width: "80vw"
  },
  "popa-tanda": {
    path: "/src/data/opere/popa-tanda.json",
    title: "Popa Tanda",
    bookmarkKey: "popa-tanda_bookmark",
    maxWidth: "330px",
    width: "80vw"
  },
  "ursul-pacalit-de-vulpe": {
    path: "/src/data/opere/ursul-pacalit-de-vulpe.json",
    title: "Ursul păcălit de vulpe",
    bookmarkKey: "ursul-pacalit-de-vulpe_bookmark",
    maxWidth: "800px",
    width: "80vw"
  },
  "viata-ca-o-prada": {
    path: "/src/data/opere/viata-ca-o-prada.json",
    title: "Viață ca o pradă",
    bookmarkKey: "viata-ca-o-prada_bookmark",
    maxWidth: "880px",
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

  const getEffectiveMaxWidth = (bookConfig, pageIndex) => {
    if (!bookConfig) return undefined;
    const base = bookConfig.maxWidth;
    const rules = Array.isArray(bookConfig.widthRules) ? bookConfig.widthRules : [];
    if (!rules.length) return base;

    const matchesRule = (spec, idx) => {
      // Support comma-separated segments in a single spec
      const segments = String(spec).split(",").map(s => s.trim()).filter(Boolean);
      for (const seg of segments) {
        if (seg.includes("-")) {
          const [startStr, endStr] = seg.split("-");
          const start = startStr === "" ? 1 : parseInt(startStr, 10);
          const end = endStr === "" ? Infinity : parseInt(endStr, 10);
          if (Number.isFinite(start) && idx + 1 >= start && idx + 1 <= end) return true;
        } else {
          const single = parseInt(seg, 10);
          if (idx + 1 === single) return true;
        }
      }
      return false;
    };

    // Last matching rule wins (allows priority by order)
    let effective = base;
    for (const rule of rules) {
      if (rule && rule.spec && rule.maxWidth && matchesRule(rule.spec, pageIndex)) {
        effective = rule.maxWidth;
      }
    }
    return effective;
  };

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
          maxWidth: getEffectiveMaxWidth(currentBook, page),
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
            {/* <span className="book-reader-width-indicator">max-width: {getEffectiveMaxWidth(currentBook, page)}</span> */}
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
