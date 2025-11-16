import styles from "./Components.module.scss";
interface Props {
  isSelected: boolean;
  label: string;
  handleClick: () => void;
  isdisabled?: boolean;
}
const CaptonBtn = ({ isSelected, label, handleClick, isdisabled }: Props) => {
  return (
    <button
      onClick={handleClick}
      className={` ${isSelected ? styles.selectedBtn : styles.CapBtn}`}
      disabled={isdisabled}
    >
      {label}
    </button>
  );
};

export default CaptonBtn;
