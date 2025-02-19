import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor, useDraggable } from "@dnd-kit/core";
import { type Frame } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Plus, Type, Image, Video, Layers, Save } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface FrameEditorProps {
  sectionId: number;
  frames: Frame[];
  onCreateFrame: (type: "text" | "image" | "video") => void;
  onUpdateFrame: (id: number, updates: Partial<Frame>) => void;
  onDeleteFrame: (id: number) => void;
  onPublish: () => void;
}

function DraggableFrame({ frame, onUpdate, onDelete }: { 
  frame: Frame; 
  onUpdate: (updates: Partial<Frame>) => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: frame.id.toString(),
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={{
        position: 'absolute',
        left: `${frame.x}%`,
        top: `${frame.y}%`,
        width: `${frame.width}%`,
        height: `${frame.height}%`,
        zIndex: frame.zIndex || 0,
        ...style
      }}
      className="border-2 border-blue-500 bg-white rounded p-2 cursor-move group"
      {...attributes}
      {...listeners}
    >
      {frame.contentType === 'text' && (
        <Textarea
          value={frame.content.text || ''}
          onChange={(e) => onUpdate({ content: { ...frame.content, text: e.target.value } })}
          className="w-full h-full resize-none"
          style={frame.content.styles}
          onClick={(e) => e.stopPropagation()}
        />
      )}
      {frame.contentType === 'image' && frame.content.mediaUrl && (
        <img 
          src={frame.content.mediaUrl} 
          alt={frame.content.altText || ''} 
          className="w-full h-full object-cover"
        />
      )}
      {frame.contentType === 'video' && frame.content.mediaUrl && (
        <video 
          src={frame.content.mediaUrl} 
          controls 
          className="w-full h-full"
        />
      )}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-2 bg-white p-1 rounded shadow">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">Edit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Frame</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              {frame.contentType === 'image' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <Input
                    value={frame.content.mediaUrl || ''}
                    onChange={(e) => onUpdate({ content: { ...frame.content, mediaUrl: e.target.value } })}
                    placeholder="Enter image URL"
                  />
                </div>
              )}
              {frame.contentType === 'video' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Video URL</label>
                  <Input
                    value={frame.content.mediaUrl || ''}
                    onChange={(e) => onUpdate({ content: { ...frame.content, mediaUrl: e.target.value } })}
                    placeholder="Enter video URL"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1">Z-Index</label>
                <Input
                  type="number"
                  value={frame.zIndex || 0}
                  onChange={(e) => onUpdate({ zIndex: parseInt(e.target.value) })}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Button variant="destructive" size="sm" onClick={onDelete}>Delete</Button>
      </div>
    </div>
  );
}

export function FrameEditor({
  sectionId,
  frames,
  onCreateFrame,
  onUpdateFrame,
  onDeleteFrame,
  onPublish,
}: FrameEditorProps) {
  const [selectedFrame, setSelectedFrame] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const frame = frames.find((f) => f.id.toString() === active.id);
    if (!frame || !canvasRef.current) return;

    const canvas = canvasRef.current.getBoundingClientRect();
    const deltaXPercent = (delta.x / canvas.width) * 100;
    const deltaYPercent = (delta.y / canvas.height) * 100;

    onUpdateFrame(frame.id, {
      x: Math.max(0, Math.min(100 - frame.width, frame.x + deltaXPercent)),
      y: Math.max(0, Math.min(100 - frame.height, frame.y + deltaYPercent)),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button onClick={() => onCreateFrame("text")}>
            <Type className="mr-2 h-4 w-4" />
            Add Text
          </Button>
          <Button onClick={() => onCreateFrame("image")}>
            <Image className="mr-2 h-4 w-4" />
            Add Image
          </Button>
          <Button onClick={() => onCreateFrame("video")}>
            <Video className="mr-2 h-4 w-4" />
            Add Video
          </Button>
        </div>
        <Button onClick={onPublish} variant="default">
          <Save className="mr-2 h-4 w-4" />
          Publish Changes
        </Button>
      </div>

      <div 
        ref={canvasRef}
        className="relative w-full bg-gray-100 rounded-lg border-2 border-dashed border-gray-300"
        style={{ height: "600px" }}
      >
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          {frames.map((frame) => (
            <DraggableFrame
              key={frame.id}
              frame={frame}
              onUpdate={(updates) => onUpdateFrame(frame.id, updates)}
              onDelete={() => onDeleteFrame(frame.id)}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}