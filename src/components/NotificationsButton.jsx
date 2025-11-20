import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '../firebase/AuthContext';
import { subscribeToNotifications, markNotificationAsRead, deleteAllNotifications } from '../firebase/notificationsService';
import { getProfileImageUrl } from '../utils/cloudinary';
import { isAdminEmail } from '../utils/adminUtils';
import '../styles/notifications.scss';

const NotificationsButton = () => {
  const { userProfile, currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [hasActiveShapeshift, setHasActiveShapeshift] = useState(false);

  // Check if shapeshift is active
  const getShapeshiftOverride = () => {
    try {
      const shapeshiftData = localStorage.getItem('shapeshift');
      if (!shapeshiftData) return null;
      
      const parsed = JSON.parse(shapeshiftData);
      const now = Date.now();
      
      // Check if shapeshift has expired
      if (parsed.expiresAt && now > parsed.expiresAt) {
        localStorage.removeItem('shapeshift');
        return null;
      }
      
      return parsed;
    } catch (error) {
      return null;
    }
  };

  // Monitor shapeshift changes
  useEffect(() => {
    const checkShapeshift = () => {
      const shapeshift = getShapeshiftOverride();
      setHasActiveShapeshift(shapeshift !== null);
    };

    // Check immediately
    checkShapeshift();

    // Check every second for changes
    const interval = setInterval(checkShapeshift, 1000);
    return () => clearInterval(interval);
  }, []);

  // Only show for admins (not semi-admins) and when shapeshift is not active
  // Check both userProfile and currentUser email as fallback
  const isAdmin = userProfile?.isAdmin === true || 
    (currentUser?.email && isAdminEmail(currentUser.email));

  useEffect(() => {
    if (!isAdmin || hasActiveShapeshift) return;

    // Subscribe to notifications
    const unsubscribe = subscribeToNotifications((notifs) => {
      setNotifications(notifs);
      const unread = notifs.filter(n => !n.read).length;
      setUnreadCount(unread);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isAdmin, hasActiveShapeshift]);

  // Don't show if not admin or if shapeshift is active - must be after all hooks
  // Show button only if we're sure user is admin (either from profile or email check)
  // Allow showing even if profile is loading but we have email confirmation
  if (!isAdmin || hasActiveShapeshift) {
    return null;
  }

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      try {
        await markNotificationAsRead(notification.id);
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    }
  };

  const handleClearHistory = async () => {
    if (!window.confirm('Ești sigur că vrei să ștergi toate notificările?')) {
      return;
    }

    try {
      await deleteAllNotifications();
      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      console.error('Error clearing notifications:', error);
      alert('Eroare la ștergerea notificărilor');
    }
  };

  const getNotificationText = (notification) => {
    const userName = notification.userName || 'Un utilizator';
    let action;
    if (notification.action === 'added') {
      action = 'a adăugat';
    } else if (notification.action === 'updated') {
      action = 'a actualizat';
    } else if (notification.action === 'deleted') {
      action = 'a șters';
    } else {
      action = 'a modificat';
    }
    const itemName = notification.itemName || '';

    switch (notification.type) {
      case 'comentariu':
        return `${userName} ${action} un comentariu${itemName ? `: "${itemName}"` : ''}`;
      case 'subiect':
        return `${userName} ${action} un subiect${itemName ? `: "${itemName}"` : ''}`;
      case 'scriitor':
        return `${userName} ${action} un scriitor${itemName ? `: "${itemName}"` : ''}`;
      case 'post':
        const scriitorName = notification.scriitorName ? ` la scriitorul ${notification.scriitorName}` : '';
        return `${userName} ${action} o postare${scriitorName}${itemName ? `: "${itemName}"` : ''}`;
      case 'film':
        return `${userName} ${action} un film${itemName ? `: "${itemName}"` : ''}`;
      default:
        return `${userName} ${action} ${notification.type}`;
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'acum';
    if (diffMins < 60) return `acum ${diffMins} ${diffMins === 1 ? 'minut' : 'minute'}`;
    if (diffHours < 24) return `acum ${diffHours} ${diffHours === 1 ? 'oră' : 'ore'}`;
    if (diffDays < 7) return `acum ${diffDays} ${diffDays === 1 ? 'zi' : 'zile'}`;
    
    return date.toLocaleDateString('ro-RO', { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <button 
        className="notifications-button"
        onClick={handleToggle}
        aria-label="Notificări"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="notifications-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="notifications-overlay" onClick={handleClose} />
          <div className="notifications-popup">
            <div className="notifications-header">
              <h2>Notificări</h2>
              <div className="notifications-header-actions">
                {notifications.length > 0 && (
                  <button 
                    className="notifications-clear"
                    onClick={handleClearHistory}
                    aria-label="Șterge istoricul"
                    title="Șterge toate notificările"
                  >
                    Șterge istoricul
                  </button>
                )}
                <button 
                  className="notifications-close"
                  onClick={handleClose}
                  aria-label="Închide"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="notifications-list">
              {notifications.length === 0 ? (
                <div className="notifications-empty">
                  <p>Nu există notificări</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const userPhotoURL = notification.userPhotoURL 
                    ? getProfileImageUrl(notification.userPhotoURL, 40, 40)
                    : '';
                  const isSemiAdminNotif = notification.isSemiAdmin === true;

                  return (
                    <div
                      key={notification.id}
                      className={`notification-item ${!notification.read ? 'unread' : ''} ${isSemiAdminNotif ? 'semi-admin' : ''}`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="notification-avatar">
                        {userPhotoURL ? (
                          <img src={userPhotoURL} alt={notification.userName || ''} />
                        ) : (
                          <div className="notification-avatar-placeholder">
                            {(notification.userName || 'U')[0].toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="notification-content">
                        <p className="notification-text">
                          {getNotificationText(notification)}
                        </p>
                        <span className="notification-time">
                          {formatTime(notification.createdAt)}
                        </span>
                      </div>
                      {!notification.read && (
                        <div className="notification-dot" />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NotificationsButton;

