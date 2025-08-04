import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import scriitoriData from '../scriitoriData';
import ScriitorInfo from '../assets/ScriitorInfo';

const REACTIONS = [
  { type: 'like', label: 'Like', emoji: '👍' },
  { type: 'love', label: 'Inimă', emoji: '❤️' },
  { type: 'ador', label: 'Ador', emoji: '😍' },
  { type: 'wow', label: 'Wow', emoji: '😮' },
  { type: 'haha', label: 'Haha', emoji: '😂' },
  { type: 'sad', label: 'Trist', emoji: '😢' },
  { type: 'cry', label: 'Plânge', emoji: '😭' },
  { type: 'angry', label: 'Nervos', emoji: '😡' },
  { type: 'strengh', label: 'Puternic', emoji: '💪' },
  { type: 'multumire', label: 'Mulțumit', emoji: '🙏' },
  { type: 'fire', label: 'Fierbinte', emoji: '🔥' },
  { type: 'cool', label: 'Tare', emoji: '😎' },
  { type: 'clap', label: 'Aplauze', emoji: '👏' },
  { type: 'Romania', label: 'Romania', emoji: '🇷🇴' }
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Scriitor = () => {
  const query = useQuery();
  const name = query.get('name');
  const data = scriitoriData[name];
  const bannerRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [likesModal, setLikesModal] = useState({ open: false, postId: null });

  const handleFullScreen = () => {
    if (!isFullScreen) {
      if (bannerRef.current.requestFullscreen) {
        bannerRef.current.requestFullscreen();
      } else if (bannerRef.current.webkitRequestFullscreen) {
        bannerRef.current.webkitRequestFullscreen();
      } else if (bannerRef.current.msRequestFullscreen) {
        bannerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      // Scroll la top după tranziție (după 700ms)
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 700);
    }
  };

  useEffect(() => {
    const handleChange = () => {
      const fsElement = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
      setIsFullScreen(!!fsElement);
    };
    document.addEventListener('fullscreenchange', handleChange);
    document.addEventListener('webkitfullscreenchange', handleChange);
    document.addEventListener('msfullscreenchange', handleChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleChange);
      document.removeEventListener('webkitfullscreenchange', handleChange);
      document.removeEventListener('msfullscreenchange', handleChange);
    };
  }, []);

  if (!data) {
    return <div className="scriitor-not-found">Scriitorul nu a fost găsit.</div>;
  }

  // Prieteni, galerie, postări
  const friends = data.friends || [];
  const gallery = data.gallery || [];
  const posts = (data.posts || []).slice().sort((a, b) => (b.pin ? 1 : 0) - (a.pin ? 1 : 0)); // Pin first
  const friendsCount = friends.length;

  // Pentru comentarii expandabile
  const [expandedComments, setExpandedComments] = useState({});
  const toggleComments = (postId) => {
    setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  // Pentru expandarea textului poeziei
  const [expandedPoems, setExpandedPoems] = useState({});
  const togglePoemText = (postId) => {
    setExpandedPoems((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  // Pentru modal preview poezie
  const [poemPreviewModal, setPoemPreviewModal] = useState({ open: false, post: null });
  const openPoemPreview = (post) => {
    setPoemPreviewModal({ open: true, post });
    // Blochează scroll-ul pe fundal
    document.body.style.overflow = 'hidden';
  };
  const closePoemPreview = () => {
    setPoemPreviewModal({ open: false, post: null });
    // Restabilește scroll-ul pe fundal
    document.body.style.overflow = 'unset';
  };

  // Pentru galerie poezie
  const [poemGalleryModal, setPoemGalleryModal] = useState({ open: false, images: [], startIndex: 0 });
  const openPoemGallery = (images, startIndex = 0) => {
    setPoemGalleryModal({ open: true, images, startIndex });
    setPoemGalleryCurrentIndex(startIndex);
    document.body.style.overflow = 'hidden';
  };
  const closePoemGallery = () => {
    setPoemGalleryModal({ open: false, images: [], startIndex: 0 });
    setPoemGalleryCurrentIndex(0);
    document.body.style.overflow = 'unset';
  };
  const [poemGalleryCurrentIndex, setPoemGalleryCurrentIndex] = useState(0);

  // Galerie preview state
  const [galleryPreviewIdx, setGalleryPreviewIdx] = useState(null);
  const [galleryCurrentIndex, setGalleryCurrentIndex] = useState(0);
  const openGalleryPreview = (idx) => {
    setGalleryPreviewIdx(idx);
    setGalleryCurrentIndex(idx);
  };
  const closeGalleryPreview = () => {
    setGalleryPreviewIdx(null);
    setGalleryCurrentIndex(0);
  };

  // Navigare către alt scriitor
  const goToScriitor = (key) => {
    window.location.href = `/scriitor?name=${key}`;
  };

  // Navigare către poezie (placeholder)
  const goToPoezie = (link) => {
    if (link) window.location.href = link;
  };

  // Helper: get likes from friends with specific reactions
  function getFriendLikes(post) {
    if (!post.reactions) {
      // Fallback pentru postările fără reacții specifice
      return friends.map((f, i) => ({
        ...f,
        reaction: REACTIONS[i % REACTIONS.length].type,
      }));
    }

    // Folosește reacțiile specifice din date
    return post.reactions.map(reaction => {
      const friend = friends.find(f => f.key === reaction.friendKey);
      if (friend) {
        return {
          ...friend,
          reaction: reaction.reaction,
        };
      }
      return null;
    }).filter(Boolean);
  }

  // Helper: get unique reactions grouped by type
  function getUniqueReactions(post) {
    const allReactions = getFriendLikes(post);
    const reactionGroups = {};

    allReactions.forEach(reaction => {
      if (!reactionGroups[reaction.reaction]) {
        reactionGroups[reaction.reaction] = [];
      }
      reactionGroups[reaction.reaction].push(reaction);
    });

    return reactionGroups;
  }

  function getReactionEmoji(type) {
    const r = REACTIONS.find(r => r.type === type);
    return r ? r.emoji : '👍';
  }

  return (
    <div className="scriitor-page">
      {/* Banner pe toată lățimea ferestrei */}
             <div
         ref={bannerRef}
         className={`scriitor-banner ${isFullScreen ? 'fullscreen' : ''} ${name}`}
         style={{
           background: `url(${data.banner}) center center/cover no-repeat`,
           backgroundPosition: name === 'eminescu' ? 'center 30%' : name === 'caragiale' ? 'center 20%' : name === 'slavici' ? 'center 20%' : name === 'rebreanu' ? 'center 20%' : name === 'calinescu' ? 'center 20%' : 'center',
         }}
       >
        {/* Buton full screen dreapta sus */}
        <button
          onClick={handleFullScreen}
          className="scriitor-fullscreen-btn-inline"
          title={isFullScreen ? "Ieși din full screen" : "Full screen banner"}
        >
          <img
            src={isFullScreen ? '/utilitary/minimize.png' : '/utilitary/full-size.png'}
            alt={isFullScreen ? 'Ieși din full screen' : 'Full screen'}
          />
        </button>
        {/* Poza de profil și info scriitor - ascunse în full screen */}
        {!isFullScreen && (
          <>
            {/* Poza de profil rotundă, centrată absolut peste banner */}
            <div className="scriitor-profile-image">
              <img src={data.img} alt={data.nume} />
            </div>
          </>
        )}
      </div>
      {/* Layout principal: stânga (info, galerie, prieteni), dreapta (postări) */}
      <div className="scriitor-main-layout">
        {/* Stânga */}
        <div className="scriitor-left-column">
          {/* Buton înapoi - stil ca fullscreen button */}
                     <button
             onClick={() => window.history.back()}
             className="scriitor-back-btn-inline"
             onMouseEnter={(e) => {
               e.target.style.transform = 'translateX(-8px)';
             }}
             onMouseLeave={(e) => {
               e.target.style.transform = 'translateX(0)';
             }}
             title="Înapoi"
           >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5M12 19L5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
                     {/* Info personală */}
           <div className="scriitor-info-card">
             <h2>{data.nume}</h2>
             <div className="scriitor-dates">{data.date}</div>
           </div>
                       {/* Prezentare */}
            <div className="scriitor-section">
              <div className="scriitor-section-title">Prezentare</div>
              <div className="scriitor-presentation">
                <ScriitorInfo name={name} />
              </div>
            </div>
          {/* Galerie */}
          <div className="scriitor-section">
            <div className="scriitor-section-title">Galerie</div>
            <div className="scriitor-gallery-grid">
              {gallery.map((img, idx) => (
                <div key={idx} className="scriitor-gallery-item">
                  <img
                    src={img}
                    alt="galerie"
                    onClick={() => openGalleryPreview(idx)}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Prieteni - grid ca la galerie, hover cu nume */}
          <div className="scriitor-friends">
            <div className="scriitor-section-title">Prieteni</div>
            {/* Sus: număr prieteni */}
            <div className="scriitor-friends-count">
              {friendsCount} prieteni
            </div>
            <div className="scriitor-friends-grid">
              {friends.map((friend, idx) => (
                <div
                  key={friend.key}
                  className="scriitor-friend-item"
                  onClick={() => goToScriitor(friend.key)}
                >
                  <img
                    src={friend.img}
                    alt={friend.name}
                  />
                  <div className="scriitor-friend-name">
                    {friend.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Dreapta: postări */}
        <div className="scriitor-right-column">
          <div className="scriitor-posts-title">Postări</div>
          <div className="scriitor-posts-container">
            {posts.map((post) => (
              <div key={post.id} className={`scriitor-post ${post.pin ? 'pinned' : ''} ${post.link ? 'clickable' : ''}`} onClick={() => post.link && goToPoezie(post.link)}>
                {post.pin && <div className="scriitor-post-pin">📌 Pin</div>}
                <div className="scriitor-post-date">{post.date}</div>
                <div className="scriitor-post-text">{post.text}</div>
                {post.isPoem ? (
                  <div className="scriitor-poem-container">
                    {/* Stânga: imagini poezie */}
                    <div className="scriitor-poem-images">
                      {post.poemImages && post.poemImages.map((img, idx) => (
                        <div key={idx} className="scriitor-poem-image"
                          onClick={(e) => {
                            e.stopPropagation();
                            openPoemGallery(post.poemImages, idx);
                            setPoemGalleryCurrentIndex(idx);
                          }}
                        >
                          <img
                            src={img}
                            alt={`${post.poemTitle} ${idx + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    {/* Dreapta: text poezie */}
                    <div className="scriitor-poem-content">
                      <h3 className="scriitor-poem-title">
                        {post.poemTitle}
                      </h3>
                      <div className="scriitor-poem-text">
                        {expandedPoems[post.id]
                          ? post.poemText
                          : post.poemText.split('\n\n').slice(0, 2).join('\n\n')
                        }
                      </div>
                      {post.poemText.split('\n\n').length > 2 && (
                        <div className="scriitor-poem-expand">
                          <button
                            onClick={(e) => { e.stopPropagation(); openPoemPreview(post); }}
                          >
                            Mai mult
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : post.image && (
                  <div className="scriitor-post-image">
                    <img src={post.image} alt="postare" />
                  </div>
                )}
                <div className="scriitor-post-actions">
                  <span
                    onClick={e => { e.stopPropagation(); setLikesModal({ open: true, postId: post.id }); }}
                  >
                    {(() => {
                      const uniqueReactions = getUniqueReactions(post);
                      const reactionTypes = Object.keys(uniqueReactions);
                      const totalReactions = getFriendLikes(post).length;

                      if (totalReactions === 0) {
                        return '👍 0';
                      }

                      // Afișează doar o emoție de fiecare tip
                      const displayReactions = reactionTypes.map(type => getReactionEmoji(type)).join(' ');
                      return `${displayReactions} ${totalReactions}`;
                    })()}
                  </span>
                  <span onClick={e => { e.stopPropagation(); toggleComments(post.id); }}>💬 {post.comments.length} comentarii</span>
                  <span>🔗 Distribuie</span>
                </div>
                {/* Comentarii */}
                {expandedComments[post.id] && (
                  <div className="scriitor-comments">
                    {post.comments.length === 0 && <div className="scriitor-no-comments">Niciun comentariu încă.</div>}
                    {post.comments.map((c, idx) => (
                      <div key={idx} className="scriitor-comment">
                        <img src={scriitoriData[c.key]?.img} alt={c.author} />
                        <span className="scriitor-comment-author" onClick={() => goToScriitor(c.key)}>{c.author}</span>
                        <span className="scriitor-comment-text">{c.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Galerie Preview Modal */}
      {galleryPreviewIdx !== null && (
        <div
          className="scriitor-modal-overlay"
          onClick={closeGalleryPreview}
        >
          <div className="scriitor-gallery-modal">
            <img
              src={gallery[galleryCurrentIndex]}
              alt="preview galerie"
              onClick={e => e.stopPropagation()}
            />
            {/* Buton închidere - în colțul imaginii */}
            <button
              onClick={closeGalleryPreview}
              className="scriitor-modal-close-btn"
              title="Închide galerie"
              tabIndex={0}
              onMouseDown={e => e.preventDefault()}
            >
              ×
            </button>
                         {/* Buton stânga */}
             {gallery.length > 1 && (
               <button
                 onClick={(e) => {
                   e.stopPropagation();
                   setGalleryCurrentIndex((prev) =>
                     prev === 0 ? gallery.length - 1 : prev - 1
                   );
                 }}
                 className="scriitor-nav-btn-left"
                 onMouseEnter={(e) => {
                   e.target.style.transform = 'translateY(-50%) translateX(-8px)';
                 }}
                 onMouseLeave={(e) => {
                   e.target.style.transform = 'translateY(-50%) translateX(0)';
                 }}
                 title="Imaginea anterioară"
               >
                 ‹
               </button>
             )}
                         {/* Buton dreapta */}
             {gallery.length > 1 && (
               <button
                 onClick={(e) => {
                   e.stopPropagation();
                   setGalleryCurrentIndex((prev) =>
                     prev === gallery.length - 1 ? 0 : prev + 1
                   );
                 }}
                 className="scriitor-nav-btn-right"
                 onMouseEnter={(e) => {
                   e.target.style.transform = 'translateY(-50%) translateX(8px)';
                 }}
                 onMouseLeave={(e) => {
                   e.target.style.transform = 'translateY(-50%) translateX(0)';
                 }}
                 title="Imaginea următoare"
               >
                 ›
               </button>
             )}
            {/* Indicator poziție */}
            {gallery.length > 1 && (
              <div className="scriitor-modal-indicators">
                {gallery.map((_, idx) => (
                  <div
                    key={idx}
                    className={`scriitor-modal-indicator ${idx === galleryCurrentIndex ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setGalleryCurrentIndex(idx);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {likesModal.open && (
        <div
          className="scriitor-modal-overlay scriitor-modal-overlay-likes"
          onClick={() => setLikesModal({ open: false, postId: null })}
        >
          <div
            className="scriitor-likes-modal"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setLikesModal({ open: false, postId: null })}
              className="scriitor-modal-close-btn-likes"
              title="Închide tabela de like-uri"
            >×</button>
            <h3>Reacții la postare</h3>
            <table>
              <thead>
                <tr>
                  <th>Prieten</th>
                  <th>Reacție</th>
                </tr>
              </thead>
              <tbody>
                {getFriendLikes(posts.find(p => p.id === likesModal.postId)).map((like, idx) => (
                  <tr key={like.key}>
                    <td>
                      <img src={like.img} alt={like.name} />
                      <span>{like.name}</span>
                    </td>
                    <td>{getReactionEmoji(like.reaction)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {getFriendLikes(posts.find(p => p.id === likesModal.postId)).length === 0 && (
              <div className="scriitor-no-likes">Niciun prieten nu a reacționat încă.</div>
            )}
          </div>
        </div>
      )}
      {/* Modal Preview Poezie */}
      {poemPreviewModal.open && (
        <div
          className="scriitor-modal-overlay scriitor-modal-overlay-poem"
          onClick={closePoemPreview}
        >
          <div
            className="scriitor-poem-preview-modal"
            onClick={e => e.stopPropagation()}
          >
            {/* Header cu titlu centrat și buton închidere */}
            <div className="scriitor-poem-preview-header">
              <h2>
                {poemPreviewModal.post.poemTitle}
              </h2>
              <button
                onClick={closePoemPreview}
                className="scriitor-modal-close-btn-poem"
                title="Închide preview poezie"
              >
                ×
              </button>
            </div>

            {/* Conținut cu scroll - doar poezia */}
            <div className="scriitor-poem-preview-content">
              <div className="scriitor-poem-preview-text">
                {poemPreviewModal.post.poemText}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal Galerie Poezie */}
      {poemGalleryModal.open && (
        <div
          className="scriitor-modal-overlay scriitor-modal-overlay-gallery"
          onClick={closePoemGallery}
        >
          <div className="scriitor-gallery-modal">
            <img
              src={poemGalleryModal.images[poemGalleryCurrentIndex]}
              alt="galerie poezie"
              onClick={e => e.stopPropagation()}
            />
            {/* Buton închidere - în colțul imaginii */}
            <button
              onClick={closePoemGallery}
              className="scriitor-modal-close-btn"
              title="Închide galerie"
              tabIndex={0}
              onMouseDown={e => e.preventDefault()}
            >
              ×
            </button>
                         {/* Buton stânga */}
             {poemGalleryModal.images.length > 1 && (
               <button
                 onClick={(e) => {
                   e.stopPropagation();
                   setPoemGalleryCurrentIndex((prev) =>
                     prev === 0 ? poemGalleryModal.images.length - 1 : prev - 1
                   );
                 }}
                 className="scriitor-nav-btn-left"
                 onMouseEnter={(e) => {
                   e.target.style.transform = 'translateY(-50%) translateX(-8px)';
                 }}
                 onMouseLeave={(e) => {
                   e.target.style.transform = 'translateY(-50%) translateX(0)';
                 }}
                 title="Imaginea anterioară"
               >
                 ‹
               </button>
             )}
                         {/* Buton dreapta */}
             {poemGalleryModal.images.length > 1 && (
               <button
                 onClick={(e) => {
                   e.stopPropagation();
                   setPoemGalleryCurrentIndex((prev) =>
                     prev === poemGalleryModal.images.length - 1 ? 0 : prev + 1
                   );
                 }}
                 className="scriitor-nav-btn-right"
                 onMouseEnter={(e) => {
                   e.target.style.transform = 'translateY(-50%) translateX(8px)';
                 }}
                 onMouseLeave={(e) => {
                   e.target.style.transform = 'translateY(-50%) translateX(0)';
                 }}
                 title="Imaginea următoare"
               >
                 ›
               </button>
             )}
            {/* Indicator poziție */}
            {poemGalleryModal.images.length > 1 && (
              <div className="scriitor-modal-indicators">
                {poemGalleryModal.images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`scriitor-modal-indicator ${idx === poemGalleryCurrentIndex ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPoemGalleryCurrentIndex(idx);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Scriitor; 