import { useState } from "react";
import { Frame } from "@/components/editor/Frame";
import { Button } from "@/components/ui/button";
import { PlusSquare, Image as ImageIcon, Video, Type } from "lucide-react";

interface FrameData {
  id: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  type: "frame" | "image" | "video" | "text";
  content?: string;
  parentId?: string;
}

export default function Editor() {
  const [frames, setFrames] = useState<FrameData[]>([]);
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);

  const addFrame = (type: FrameData["type"]) => {
    const newFrame: FrameData = {
      id: `frame-${frames.length + 1}`,
      position: { x: 100, y: 100 },
      size: { width: 200, height: 150 },
      type,
    };
    setFrames([...frames, newFrame]);
  };

  const updateFramePosition = (id: string, x: number, y: number) => {
    setFrames(frames.map(frame => 
      frame.id === id ? { ...frame, position: { x, y } } : frame
    ));
  };

  const updateFrameSize = (id: string, width: number, height: number) => {
    setFrames(frames.map(frame => 
      frame.id === id ? { ...frame, size: { width, height } } : frame
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b p-4 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => addFrame("frame")}
        >
          <PlusSquare className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => addFrame("image")}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => addFrame("video")}
        >
          <Video className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => addFrame("text")}
        >
          <Type className="h-4 w-4" />
        </Button>
      </div>

      {/* Canvas */}
      <div className="relative mt-16 min-h-[calc(100vh-4rem)] bg-white">
        {frames.map((frame) => (
          <Frame
            key={frame.id}
            id={frame.id}
            initialPosition={frame.position}
            initialSize={frame.size}
            onPositionChange={updateFramePosition}
            onSizeChange={updateFrameSize}
            className={selectedFrame === frame.id ? "border-blue-500" : ""}
            onClick={() => setSelectedFrame(frame.id)}
          >
            {/* Frame content based on type */}
            {frame.type === "text" && (
              <div className="p-2">
                <textarea
                  className="w-full h-full resize-none border-none focus:outline-none"
                  placeholder="Enter text..."
                />
              </div>
            )}
          </Frame>
        ))}
      </div>
    </div>
  );
}
