import { useState } from "react";
import styles from "./Notes.module.scss";

interface NoteProps {
  onSave: (note: string) => void;
  onDelete: () => void;
}

const Notes = ({ onSave, onDelete }: NoteProps) => {
  const [note, setNote] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  const handleSave = () => {
    onSave(note);
  };

  const handleDelete = () => {
    setNote("");
    onDelete();
  };

  return (
    <div className={styles.note}>
      <textarea
        className={styles.textarea}
        value={note}
        onChange={handleChange}
        placeholder="Notes..."
      />
      <div className={styles.buttons}>
        <button onClick={handleSave} className={styles.button}>
          Save
        </button>
        <button onClick={handleDelete} className={styles.button}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Notes;
