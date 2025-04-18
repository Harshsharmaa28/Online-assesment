
import React from 'react';

interface QRCodeProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
}

// This is a placeholder component that simulates a QR code
// In a real implementation, you would use a library like qrcode.react
const QRCode: React.FC<QRCodeProps> = ({ value, size = 128, bgColor = '#ffffff', fgColor = '#000000' }) => {
  // Generate a simplified QR code-like pattern
  const gridSize = 7;
  const cellSize = size / gridSize;
  
  // Generate a deterministic pattern based on the value
  const pattern = [];
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      // Create a simple pattern based on the characters in the value string
      const charIndex = (i * gridSize + j) % value.length;
      const charCode = value.charCodeAt(charIndex);
      if (
        // Create a QR-like pattern with fixed corners
        (i < 2 && j < 2) || // top-left corner
        (i < 2 && j >= gridSize - 2) || // top-right corner
        (i >= gridSize - 2 && j < 2) || // bottom-left corner
        charCode % 3 === 0 // deterministic pattern based on the value
      ) {
        pattern.push({ x: j * cellSize, y: i * cellSize, fill: true });
      } else {
        pattern.push({ x: j * cellSize, y: i * cellSize, fill: false });
      }
    }
  }
  
  return (
    <div style={{ width: size, height: size, backgroundColor: bgColor, position: 'relative', border: '1px solid #ccc' }}>
      {pattern.map((cell, index) => (
        cell.fill && (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: cell.x,
              top: cell.y,
              width: cellSize,
              height: cellSize,
              backgroundColor: fgColor,
            }}
          />
        )
      ))}
    </div>
  );
};

export default QRCode;
