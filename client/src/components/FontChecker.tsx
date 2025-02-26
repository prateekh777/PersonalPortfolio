import { useEffect } from 'react';

export function FontChecker() {
  useEffect(() => {
    // Get all elements that have font applied
    const allElements = document.querySelectorAll('*');
    const fontSet = new Set<string>();

    allElements.forEach(element => {
      const computedStyle = window.getComputedStyle(element);
      const fontFamily = computedStyle.getPropertyValue('font-family');
      if (fontFamily) {
        fontSet.add(fontFamily);
      }
    });

    console.log('Fonts in use across the website:');
    console.log(Array.from(fontSet));
  }, []);

  return null;
}