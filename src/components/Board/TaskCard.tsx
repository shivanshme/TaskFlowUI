import { useDraggable } from "@dnd-kit/core";

export default function TaskCard({ task }: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: String(task.id),
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  const priorityClass =
    task.priority === "High"
      ? "priority-high"
      : task.priority === "Medium"
      ? "priority-medium"
      : "priority-low";

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`task-card ${priorityClass}`}
      style={style}
    >
      <strong>{task.title}</strong>
      <p style={{ fontSize: "11px", opacity: 0.7 }}>
        {task.description}
      </p>
    </div>
  );
}