
import styles from "./Components.module.scss";
interface Props {
  isSelected: boolean;
  label: string;
  handleClick: () => void;
}
const CaptonBtn = ({ isSelected, label, handleClick }: Props) => {
  return (
    <button
      onClick={handleClick}
      className={` ${isSelected ? styles.selectedBtn : styles.CapBtn}`}
    >
      {label}
    </button>
  );
};

export default CaptonBtn;
