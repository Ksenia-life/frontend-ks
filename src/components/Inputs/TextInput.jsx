import styles from "./styles.module.css";

export function TextInput({ label, value, onChange, placeholder }) {
  return (
    <label className={styles.label}>
      <span className={styles.labelText}>{label}</span>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
}