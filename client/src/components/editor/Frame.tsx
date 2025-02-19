import * as React from "react";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface FrameProps {
  id: string;
  initialPosition: { x: number; y: number };
  initialSize: { width: number; height: number };
  children?: React.ReactNode;
  onPositionChange?: (id: string, x: number, y: number) => void;
  onSizeChange?: (id: string, width: number, height: number) => void;
  className?: string;
}

export function Frame({
  id,
  initialPosition,
  initialSize,
  children,
  onPositionChange,
  onSizeChange,
  className
}: FrameProps) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;
    
    setPosition({ x: newX, y: newY });
    onPositionChange?.(id, newX, newY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleResize = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    if (!isResizing) return;

    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;

    let newWidth = size.width;
    let newHeight = size.height;

    if (direction.includes('e')) {
      newWidth = e.clientX - rect.left;
    }
    if (direction.includes('s')) {
      newHeight = e.clientY - rect.top;
    }

    setSize({ width: newWidth, height: newHeight });
    onSizeChange?.(id, newWidth, newHeight);
  };

  return (
    <div
      ref={frameRef}
      className={cn(
        "absolute border-2 border-dashed border-gray-400 cursor-move",
        isDragging && "border-blue-500",
        className
      )}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => isDragging && handleMouseUp()}
    >
      {children}
      
      {/* Resize handles */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsResizing(true);
        }}
        onMouseMove={(e) => handleResize(e, 'se')}
      />
    </div>
  );
}
