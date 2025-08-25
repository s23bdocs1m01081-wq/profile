import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16 py-6 text-center text-sm text-gray-600">
      <p>&copy; {new Date().getFullYear()}  All rights reserved.</p>
    </footer>
  );
}