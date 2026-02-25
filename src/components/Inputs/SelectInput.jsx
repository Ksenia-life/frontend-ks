import styles from "./styles.module.css";

export function SelectInput({ label, value, onChange, options }) {
  return (
    <label className={styles.label}>
      <span className={styles.labelText}>{label}</span>
      <select className={styles.select} value={value} onChange={onChange}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}