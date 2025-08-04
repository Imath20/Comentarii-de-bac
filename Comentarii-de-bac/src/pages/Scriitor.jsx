import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import scriitoriData from '../scriitoriData';
import ScriitorInfo from '../components/ScriitorInfo';

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
    return <div style={{ padding: '3rem', textAlign: 'center' }}>Scriitorul nu a fost găsit.</div>;
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
    <div style={{ minHeight: '100vh', background: '#fff', width: '100vw', overflowX: 'hidden' }}>
      {/* Banner pe toată lățimea ferestrei */}
      <div
        ref={bannerRef}
        style={{
          width: '100vw',
          height: isFullScreen ? '100vh' : 450,
          background: `url(${data.banner}) center center/cover no-repeat`,
          backgroundPosition: name === 'eminescu' ? 'center 30%' : name === 'caragiale' ? 'center 20%' : name === 'slavici' ? 'center 20%' : name === 'rebreanu' ? 'center 20%' : name === 'calinescu' ? 'center 20%' : 'center',
          position: 'relative',
          left: 0,
          top: 0,
          margin: 0,
          padding: 0,
          boxShadow: '0 4px 24px 0 rgba(124,79,43,0.10)',
          zIndex: 1,
          transition: 'height 0.3s',
        }}
      >
        {/* Buton full screen dreapta sus */}
        <button
          onClick={handleFullScreen}
          style={{
            position: 'absolute',
            top: 18,
            right: 28,
            background: 'none',
            border: 'none',
            borderRadius: '50%',
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'none',
            cursor: 'pointer',
            zIndex: 20,
            transition: 'background 0.2s',
            padding: 0,
          }}
          title={isFullScreen ? "Ieși din full screen" : "Full screen banner"}
        >
          <img
            src={isFullScreen ? '/utilitary/minimize.png' : '/utilitary/full-size.png'}
            alt={isFullScreen ? 'Ieși din full screen' : 'Full screen'}
            style={{ width: 20, height: 20, objectFit: 'contain', filter: 'invert(1) brightness(2)' }}
          />
        </button>
        {/* Poza de profil și info scriitor - ascunse în full screen */}
        {!isFullScreen && (
          <>
            {/* Poza de profil rotundă, centrată absolut peste banner */}
            <div style={{
              position: 'absolute',
              left: '50%',
              bottom: -90,
              transform: 'translateX(-50%)',
              width: 180,
              height: 180,
              borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 8px 32px 0 rgba(60,40,20,0.13)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              border: '7px solid #fff',
              zIndex: 10,
            }}>
              <img src={data.img} alt={data.nume} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </>
        )}
      </div>
      {/* Layout principal: stânga (info, galerie, prieteni), dreapta (postări) */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        maxWidth: 1300,
        margin: '0 auto',
        marginTop: 120,
        padding: '0 1.5rem',
        paddingBottom: 50,
        gap: 48,
      }}>
        {/* Stânga */}
        <div style={{ flex: '0 0 340px', minWidth: 280, maxWidth: 360, position: 'relative' }}>
          {/* Buton înapoi - stil ca fullscreen button */}
          <button
            onClick={() => window.history.back()}
            style={{
              position: 'absolute',
              top: -100,
              left: 0,
              background: 'none',
              border: 'none',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'none',
              cursor: 'pointer',
              zIndex: 20,
              transition: 'background 0.2s',
              padding: 0,
              outline: 'none',
            }}
            title="Înapoi"
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateX(-8px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateX(0)';
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: 'invert(1) brightness(2)' }}
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
           <div style={{
             background: '#fffbe6',
             borderRadius: 16,
             boxShadow: '0 2px 12px 0 rgba(124,79,43,0.07)',
             padding: '1.2rem 1.1rem',
             marginBottom: 24,
             textAlign: 'center',
           }}>
             <h2 style={{ fontSize: '1.7rem', fontWeight: 900, margin: 0 }}>{data.nume}</h2>
             <div style={{ fontSize: '1.1rem', color: '#a97c50', fontWeight: 500, marginTop: 6 }}>{data.date}</div>
           </div>
                       {/* Prezentare */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontWeight: 900, fontSize: '1.5rem', marginBottom: 8 }}>Prezentare</div>
              <div style={{ 
                background: '#fff', 
                borderRadius: 12, 
                padding: '1rem', 
                boxShadow: '0 2px 8px 0 rgba(124,79,43,0.10)',
                fontSize: '0.95rem',
                lineHeight: 1.5,
                color: '#444'
              }}>
                <ScriitorInfo name={name} />
              </div>
            </div>
          {/* Galerie */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 900, fontSize: '1.5rem', marginBottom: 8 }}>Galerie</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {gallery.map((img, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <img
                    src={img}
                    alt="galerie"
                    style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 10, boxShadow: '0 2px 8px 0 rgba(124,79,43,0.10)', cursor: 'pointer' }}
                    onClick={() => openGalleryPreview(idx)}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Prieteni - grid ca la galerie, hover cu nume */}
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.5rem', marginBottom: 8 }}>Prieteni</div>
            {/* Sus: număr prieteni */}
            <div style={{
              fontWeight: 700,
              fontSize: '1rem',
              color: '#a97c50',
              marginBottom: 5,
            }}>
              {friendsCount} prieteni
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {friends.map((friend, idx) => (
                <div
                  key={friend.key}
                  style={{ position: 'relative', width: 100, height: 100, borderRadius: 10, overflow: 'hidden', cursor: 'pointer', boxShadow: '0 2px 8px 0 rgba(124,79,43,0.10)', background: '#fffbe6' }}
                  onClick={() => goToScriitor(friend.key)}
                >
                  <img
                    src={friend.img}
                    alt={friend.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10, display: 'block' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0, 0, 0, 0)',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '0.98rem',
                      textAlign: 'center',
                      opacity: 0,
                      transition: 'opacity 0.18s',
                      padding: '0.2em 0',
                      pointerEvents: 'none',
                    }}
                    className="friend-name-hover"
                  >
                    {friend.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Dreapta: postări */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: '1.18rem', color: '#a97c50', marginBottom: 18 }}>Postări</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {posts.map((post) => (
              <div key={post.id} style={{
                background: post.pin ? '#fffbe6' : '#fff',
                borderRadius: 18,
                boxShadow: post.pin ? '0 4px 24px 0 rgba(124,79,43,0.13)' : '0 2px 12px 0 rgba(124,79,43,0.07)',
                padding: '1.5rem 1.3rem',
                border: post.pin ? '2.5px solid #a97c50' : '1.5px solid #ececec',
                position: 'relative',
                cursor: post.link ? 'pointer' : 'default',
                transition: 'box-shadow 0.2s',
              }} onClick={() => post.link && goToPoezie(post.link)}>
                {post.pin && <div style={{ position: 'absolute', top: 12, right: 18, color: '#a97c50', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.04em' }}>📌 Pin</div>}
                <div style={{ fontWeight: 700, fontSize: '1.08rem', color: '#a97c50', marginBottom: 4 }}>{post.date}</div>
                <div style={{ fontWeight: 600, fontSize: '1.18rem', marginBottom: 8 }}>{post.text}</div>
                {post.isPoem ? (
                  <div style={{ margin: '18px 0', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                    {/* Stânga: imagini poezie */}
                    <div style={{ flex: '0 0 200px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {post.poemImages && post.poemImages.map((img, idx) => (
                        <div key={idx} style={{
                          width: '100%',
                          borderRadius: 12,
                          overflow: 'hidden',
                          boxShadow: '0 2px 12px 0 rgba(124,79,43,0.13)',
                          border: '1px solid #f0e6d6',
                          cursor: 'pointer',
                          transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openPoemGallery(post.poemImages, idx);
                            setPoemGalleryCurrentIndex(idx);
                          }}
                          onMouseEnter={(e) => {
                            e.target.parentElement.style.transform = 'scale(1.05)';
                            e.target.parentElement.style.boxShadow = '0 4px 20px 0 rgba(124,79,43,0.20)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.parentElement.style.transform = 'scale(1)';
                            e.target.parentElement.style.boxShadow = '0 2px 12px 0 rgba(124,79,43,0.13)';
                          }}
                        >
                          <img
                            src={img}
                            alt={`${post.poemTitle} ${idx + 1}`}
                            style={{
                              width: '100%',
                              height: 'auto',
                              display: 'block',
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    {/* Dreapta: text poezie */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        color: '#a97c50',
                        marginBottom: 12,
                        textAlign: 'center'
                      }}>
                        {post.poemTitle}
                      </h3>
                      <div style={{
                        fontStyle: 'italic',
                        lineHeight: 1.6,
                        color: '#444',
                        whiteSpace: 'pre-line',
                        textAlign: 'center'
                      }}>
                        {expandedPoems[post.id]
                          ? post.poemText
                          : post.poemText.split('\n\n').slice(0, 2).join('\n\n')
                        }
                      </div>
                      {post.poemText.split('\n\n').length > 2 && (
                        <div style={{ textAlign: 'center', marginTop: 16 }}>
                          <button
                            onClick={(e) => { e.stopPropagation(); openPoemPreview(post); }}
                            style={{
                              background: 'none',
                              border: '2px solid #a97c50',
                              borderRadius: 20,
                              padding: '8px 20px',
                              color: '#a97c50',
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              fontSize: '0.9rem'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = '#a97c50';
                              e.target.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'none';
                              e.target.style.color = '#a97c50';
                            }}
                          >
                            Mai mult
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : post.image && (
                  <div style={{ width: '100%', margin: '18px 0 18px 0', borderRadius: '18px 18px 0 0', overflow: 'hidden', boxShadow: '0 2px 12px 0 rgba(124,79,43,0.13)' }}>
                    <img src={post.image} alt="postare" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', maxHeight: 420 }} />
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 10 }}>
                  <span style={{ cursor: 'pointer', color: '#a97c50', fontWeight: 600 }}
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
                  <span style={{ cursor: 'pointer', color: '#a97c50', fontWeight: 600 }} onClick={e => { e.stopPropagation(); toggleComments(post.id); }}>💬 {post.comments.length} comentarii</span>
                  <span style={{ cursor: 'pointer', color: '#a97c50', fontWeight: 600 }}>🔗 Distribuie</span>
                </div>
                {/* Comentarii */}
                {expandedComments[post.id] && (
                  <div style={{ marginTop: 14, background: 'rgba(243, 226, 180, 0.54)', borderRadius: 10, padding: '0.7rem 1rem' }}>
                    {post.comments.length === 0 && <div style={{ color: '#bbb', fontStyle: 'italic' }}>Niciun comentariu încă.</div>}
                    {post.comments.map((c, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <img src={scriitoriData[c.key]?.img} alt={c.author} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 1px 4px 0 rgba(124,79,43,0.10)' }} />
                        <span style={{ fontWeight: 600, color: '#a97c50', cursor: 'pointer' }} onClick={() => goToScriitor(c.key)}>{c.author}</span>
                        <span style={{ color: '#444', fontWeight: 500 }}>{c.text}</span>
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
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(30,20,10,0.45)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={closeGalleryPreview}
        >
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img
              src={gallery[galleryCurrentIndex]}
              alt="preview galerie"
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: 18,
                boxShadow: '0 4px 24px 0 rgba(60,40,20,0.18)',
                zIndex: 1005,
                display: 'block',
              }}
              onClick={e => e.stopPropagation()}
            />
            {/* Buton închidere - în colțul imaginii */}
            <button
              onClick={closeGalleryPreview}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'none',
                border: 'none',
                borderRadius: 0,
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 1010,
                fontSize: 44,
                color: '#fff',
                fontWeight: 900,
                boxShadow: 'none',
                outline: 'none',
                transition: 'none',
                padding: 0,
              }}
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
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  borderRadius: 0,
                  width: 60,
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 1010,
                  fontSize: 40,
                  color: '#fff',
                  fontWeight: 150,
                  boxShadow: 'none',
                  outline: 'none',
                  transition: 'transform 0.2s ease',
                  padding: 0,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                }}
                title="Imaginea anterioară"
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-50%) translateX(-8px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(-50%) translateX(0)';
                }}
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
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  borderRadius: 0,
                  width: 60,
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 1010,
                  fontSize: 40,
                  color: '#fff',
                  fontWeight: 150,
                  boxShadow: 'none',
                  outline: 'none',
                  transition: 'transform 0.2s ease',
                  padding: 0,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                }}
                title="Imaginea următoare"
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-50%) translateX(8px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(-50%) translateX(0)';
                }}
              >
                ›
              </button>
            )}
            {/* Indicator poziție */}
            {gallery.length > 1 && (
              <div style={{
                position: 'absolute',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 8,
                zIndex: 1010
              }}>
                {gallery.map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: idx === galleryCurrentIndex ? '#fff' : 'rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
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
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,20,10,0.45)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => setLikesModal({ open: false, postId: null })}
        >
          <div
            style={{
              background: '#fff', borderRadius: 18, boxShadow: '0 8px 32px 0 rgba(60,40,20,0.18)', minWidth: 320, maxWidth: '90vw', minHeight: 180, padding: '2.2rem 1.5rem 1.2rem 1.5rem', position: 'relative', zIndex: 2010, maxHeight: '80vh', overflowY: 'auto',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setLikesModal({ open: false, postId: null })}
              style={{ position: 'absolute', top: 6, right: 12, background: 'none', border: 'none', borderRadius: 0, fontSize: 32, color: '#a97c50', fontWeight: 900, cursor: 'pointer', zIndex: 2020, boxShadow: 'none', outline: 'none', transition: 'none', padding: 5 }}
              title="Închide tabela de like-uri"
            >×</button>
            <h3 style={{ fontWeight: 900, fontSize: '1.25rem', color: '#a97c50', marginBottom: 18, textAlign: 'left' }}>Reacții la postare</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', fontWeight: 700, color: '#a97c50', paddingBottom: 8 }}>Prieten</th>
                  <th style={{ textAlign: 'center', fontWeight: 700, color: '#a97c50', paddingBottom: 8 }}>Reacție</th>
                </tr>
              </thead>
              <tbody>
                {getFriendLikes(posts.find(p => p.id === likesModal.postId)).map((like, idx) => (
                  <tr key={like.key} style={{ borderBottom: '1px solid #f0e6d6' }}>
                    <td style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img src={like.img} alt={like.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 1px 4px 0 rgba(124,79,43,0.10)' }} />
                      <span style={{ fontWeight: 600, color: '#a97c50' }}>{like.name}</span>
                    </td>
                    <td style={{ textAlign: 'center', fontSize: 28 }}>{getReactionEmoji(like.reaction)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {getFriendLikes(posts.find(p => p.id === likesModal.postId)).length === 0 && (
              <div style={{ color: '#bbb', fontStyle: 'italic', textAlign: 'center', marginTop: 18 }}>Niciun prieten nu a reacționat încă.</div>
            )}
          </div>
        </div>
      )}
      {/* Modal Preview Poezie */}
      {poemPreviewModal.open && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(122, 113, 113, 0.45)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={closePoemPreview}
        >
          <div
            style={{
              background: 'rgb(255, 255, 255)',
              borderRadius: 18,
              boxShadow: '0 8px 32px 0 rgba(60,40,20,0.18)',
              maxWidth: '90vw',
              maxHeight: '90vh',
              width: '800px',
              position: 'relative',
              zIndex: 3010,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header cu titlu centrat și buton închidere */}
            <div style={{
              padding: '2rem 2rem 1rem 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <h2 style={{
                fontWeight: 900,
                fontSize: '2.5rem',
                paddingTop: '2.5rem',
                color: '#a97c50',
                margin: 0,
                textAlign: 'center'
              }}>
                {poemPreviewModal.post.poemTitle}
              </h2>
              <button
                onClick={closePoemPreview}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '0.5rem',
                  background: 'none',
                  border: 'none',
                  borderRadius: 0,
                  fontSize: 32,
                  color: '#a97c50',
                  fontWeight: 900,
                  cursor: 'pointer',
                  zIndex: 3020,
                  boxShadow: 'none',
                  outline: 'none',
                  transition: 'none',
                  padding: 5
                }}
                title="Închide preview poezie"
              >
                ×
              </button>
            </div>

            {/* Conținut cu scroll - doar poezia */}
            <div
              className="poem-modal-scroll"
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '3rem 2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start'
              }}
            >
              <div style={{
                maxWidth: '600px',
                width: '100%'
              }}>
                <div style={{
                  fontStyle: 'italic',
                  lineHeight: 2,
                  color: '#444',
                  whiteSpace: 'pre-line',
                  textAlign: 'center',
                  fontSize: '1.3rem',
                  fontWeight: 500
                }}>
                  {poemPreviewModal.post.poemText}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal Galerie Poezie */}
      {poemGalleryModal.open && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(30,20,10,0.45)',
            zIndex: 4000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={closePoemGallery}
        >
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // width: '100%',
            // height: '100%',
          }}>
            <img
              src={poemGalleryModal.images[poemGalleryCurrentIndex]}
              alt="galerie poezie"
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: 18,
                boxShadow: '0 4px 24px 0 rgba(60,40,20,0.18)',
                zIndex: 4005,
                display: 'block',
              }}
              onClick={e => e.stopPropagation()}
            />
            {/* Buton închidere - în colțul imaginii */}
            <button
              onClick={closePoemGallery}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'none',
                border: 'none',
                borderRadius: 0,
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 4010,
                fontSize: 44,
                color: '#fff',
                fontWeight: 900,
                boxShadow: 'none',
                outline: 'none',
                transition: 'none',
                padding: 0,
              }}
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
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  borderRadius: 0,
                  width: 60,
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 4010,
                  fontSize: 40,
                  color: '#fff',
                  fontWeight: 150,
                  boxShadow: 'none',
                  outline: 'none',
                  transition: 'transform 0.2s ease',
                  padding: 0,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                }}
                title="Imaginea anterioară"
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-50%) translateX(-8px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(-50%) translateX(0)';
                }}
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
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  borderRadius: 0,
                  width: 60,
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 4010,
                  fontSize: 40,
                  color: '#fff',
                  fontWeight: 150,
                  boxShadow: 'none',
                  outline: 'none',
                  transition: 'transform 0.2s ease',
                  padding: 0,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                }}
                title="Imaginea următoare"
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-50%) translateX(8px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(-50%) translateX(0)';
                }}
              >
                ›
              </button>
            )}
            {/* Indicator poziție */}
            {poemGalleryModal.images.length > 1 && (
              <div style={{
                position: 'absolute',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 8,
                zIndex: 4010
              }}>
                {poemGalleryModal.images.map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: idx === poemGalleryCurrentIndex ? '#fff' : 'rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
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