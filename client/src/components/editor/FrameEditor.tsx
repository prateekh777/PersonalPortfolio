import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { type Frame } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Plus, Image as ImageIcon, Type, Video, Save } from "lucide-react";
import { useState } from "react";

interface DraggableFrameProps {
  frame: Frame;
  onUpdate: (id: number, updates: Partial<Frame>) => void;
  onDelete: (id: number) => void;
}

const DraggableFrame = ({ frame, onUpdate, onDelete }: DraggableFrameProps) => {
  return (
    <div
      style={{
        position: "absolute",
        left: `${frame.x}%`,
        top: `${frame.y}%`,
        width: `${frame.width}%`,
        height: `${frame.height}%`,
        zIndex: frame.zIndex,
      }}
      className="border-2 border-blue-500 bg-white rounded-lg shadow-lg cursor-move group"
    >
      <div className="p-2">
        {frame.contentType === "text" && (
          <textarea
            value={frame.content.text || ""}
            onChange={(e) =>
              onUpdate(frame.id, {
                content: { ...frame.content, text: e.target.value },
              })
            }
            className="w-full h-full resize-none border-none focus:outline-none"
            style={frame.content.styles}
          />
        )}
        {frame.contentType === "image" && frame.content.mediaUrl && (
          <img
            src={frame.content.mediaUrl}
            alt={frame.content.altText || "Frame content"}
            className="w-full h-full object-cover"
          />
        )}
        {frame.contentType === "video" && frame.content.mediaUrl && (
          <video
            src={frame.content.mediaUrl}
            controls
            className="w-full h-full"
          />
        )}
      </div>
      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 bg-white rounded-bl-lg shadow">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(frame.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

interface FrameEditorProps {
  sectionId: number;
  frames: Frame[];
  onCreateFrame: (type: "text" | "image" | "video") => void;
  onUpdateFrame: (id: number, updates: Partial<Frame>) => void;
  onDeleteFrame: (id: number) => void;
  onPublish: () => void;
}

export function FrameEditor({
  sectionId,
  frames,
  onCreateFrame,
  onUpdateFrame,
  onDeleteFrame,
  onPublish,
}: FrameEditorProps) {
  const [isDragging, setIsDragging] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    const { active, delta } = event;
    const frame = frames.find((f) => f.id === active.id);
    if (!frame) return;

    // Convert pixel delta to percentage
    const container = document.getElementById("frame-editor-canvas");
    if (!container) return;

    const deltaXPercent = (delta.x / container.clientWidth) * 100;
    const deltaYPercent = (delta.y / container.clientHeight) * 100;

    onUpdateFrame(frame.id, {
      x: Math.max(0, Math.min(100 - frame.width, frame.x + deltaXPercent)),
      y: Math.max(0, Math.min(100 - frame.height, frame.y + deltaYPercent)),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onCreateFrame("text")}
          >
            <Type className="mr-2 h-4 w-4" />
            Add Text
          </Button>
          <Button
            variant="outline"
            onClick={() => onCreateFrame("image")}
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Add Image
          </Button>
          <Button
            variant="outline"
            onClick={() => onCreateFrame("video")}
          >
            <Video className="mr-2 h-4 w-4" />
            Add Video
          </Button>
        </div>
        <Button onClick={onPublish}>
          <Save className="mr-2 h-4 w-4" />
          Publish
        </Button>
      </div>

      <div
        id="frame-editor-canvas"
        className="relative w-full bg-gray-100 rounded-lg"
        style={{ height: "600px" }}
      >
        <DndContext
          sensors={sensors}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
        >
          {frames.map((frame) => (
            <DraggableFrame
              key={frame.id}
              frame={frame}
              onUpdate={onUpdateFrame}
              onDelete={onDeleteFrame}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}
