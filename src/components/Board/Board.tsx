import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useStore } from "../../store/useStore";
import Column from "./Column";
import { COLUMNS } from "../../constants/columns";
import "../../styles/board.css";

export default function Board() {
  const { tasks, setTasks } = useStore((s: any) => s);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    const updatedTasks = tasks.map((t: any) =>
      String(t.id) === String(taskId)
        ? { ...t, status: newStatus }
        : t
    );

    setTasks(updatedTasks);

    // 🔜 Next step: call backend API here
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="board-container">
        {COLUMNS.map((col) => (
          <Column
            key={col}
            id={col}
            title={col}
            tasks={tasks.filter((t: any) => t.status === col)}
          />
        ))}
      </div>
    </DndContext>
  );
}