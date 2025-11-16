import styles from "./Components.module.scss";
interface Props {
  label1: string;
  label2: string;
  handleleftBtn: () => void;
  handlelRightBtn: () => void;
  isLeftBtnDisabled?: boolean;
  isRightBtnDisabled?: boolean;
}
const FooterBtn = ({
  label1,
  label2,
  handleleftBtn,
  handlelRightBtn,
  isLeftBtnDisabled,
  isRightBtnDisabled,
}: Props) => {
  return (
    <div className={`${styles.footerWrapper}`}>
      <div className="d-flex w-100 justify-content-evenly">
        <button
          className="btn btn-outline-primary"
          onClick={handleleftBtn}
          disabled={isLeftBtnDisabled}
        >
          {label1}
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={handlelRightBtn}
          disabled={isRightBtnDisabled}
        >
          {label2}
        </button>
      </div>
      <div
        className={`${styles.startText} animate__animated animate__heartBeat animate__infinite`}
      >
        Registrations closes soon
      </div>
    </div>
  );
};

export default FooterBtn;
