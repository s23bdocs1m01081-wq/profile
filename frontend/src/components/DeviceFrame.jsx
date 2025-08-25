import React from 'react';

/**
 * DeviceFrame component for displaying content inside device mockups
 * @param {Object} props
 * @param {'phone'|'tablet'|'laptop'|'desktop'} props.variant - Device type
 * @param {'portrait'|'landscape'} props.orientation - Device orientation (for phone/tablet)
 * @param {boolean} props.notch - Show camera notch for phone variant
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Content to display inside the device frame
 */
function DeviceFrame({ 
  variant = 'phone', 
  orientation = 'portrait', 
  notch = false, 
  className = '', 
  children 
}) {
  const getDeviceStyles = () => {
    switch (variant) {
      case 'phone':
        return orientation === 'portrait' 
          ? {
              container: 'relative bg-gray-900 rounded-[1.5rem] p-1 shadow-lg mx-auto max-w-[240px] aspect-[9/16]',
              screen: 'bg-white rounded-[1.25rem] overflow-hidden h-full relative',
              notchStyle: notch ? 'before:absolute before:top-2 before:left-1/2 before:-translate-x-1/2 before:w-16 before:h-6 before:bg-gray-900 before:rounded-full before:z-10' : ''
            }
          : {
              container: 'relative bg-gray-900 rounded-[1.5rem] p-1 shadow-lg mx-auto max-w-[400px] aspect-[16/9]',
              screen: 'bg-white rounded-[1.25rem] overflow-hidden h-full relative',
              notchStyle: ''
            };
      
      case 'tablet':
        return orientation === 'portrait'
          ? {
              container: 'relative bg-gray-800 rounded-[2rem] p-2 shadow-xl mx-auto max-w-[320px] aspect-[4/5]',
              screen: 'bg-white rounded-[1.5rem] overflow-hidden h-full',
              notchStyle: ''
            }
          : {
              container: 'relative bg-gray-800 rounded-[2rem] p-2 shadow-xl mx-auto max-w-[480px] aspect-[5/4]',
              screen: 'bg-white rounded-[1.5rem] overflow-hidden h-full',
              notchStyle: ''
            };
      
      case 'laptop':
        return {
          container: 'relative mx-auto max-w-[600px]',
          screen: 'bg-gray-800 rounded-t-xl p-3 shadow-2xl',
          inner: 'bg-white rounded-lg overflow-hidden aspect-[16/10]',
          base: 'bg-gray-300 h-2 rounded-b-xl mx-auto w-full max-w-[640px] shadow-lg',
          notchStyle: ''
        };
      
      case 'desktop':
        return {
          container: 'relative mx-auto max-w-[700px]',
          screen: 'bg-gray-900 rounded-lg p-4 shadow-2xl',
          inner: 'bg-white rounded-md overflow-hidden aspect-[16/9]',
          stand: 'bg-gray-600 h-16 w-24 mx-auto mt-2 rounded-b-lg relative before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:w-32 before:h-2 before:bg-gray-700 before:rounded-full',
          notchStyle: ''
        };
      
      default:
        return getDeviceStyles().phone;
    }
  };

  const styles = getDeviceStyles();

  if (variant === 'laptop') {
    return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.screen}>
          <div className={styles.inner}>
            {children}
          </div>
        </div>
        <div className={styles.base}></div>
      </div>
    );
  }

  if (variant === 'desktop') {
    return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.screen}>
          <div className={styles.inner}>
            {children}
          </div>
        </div>
        <div className={styles.stand}></div>
      </div>
    );
  }

  // Phone and Tablet variants
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={`${styles.screen} ${styles.notchStyle}`}>
        {children}
      </div>
    </div>
  );
}

export default DeviceFrame;