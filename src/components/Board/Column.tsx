import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function Column({ id, title, tasks }: any) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className="board-column"
      style={{
        background: isOver ? "#e2e8f0" : undefined, // 🔥 highlight on drop
      }}
    >
      <div className="column-title">{title}</div>

      <div className="column-tasks">
        {tasks.length === 0 ? (
          <div className="empty-text">No tasks</div>
        ) : (
          tasks.map((t: any) => <TaskCard key={t.id} task={t} />)
        )}
      </div>
    </div>
  );
}
