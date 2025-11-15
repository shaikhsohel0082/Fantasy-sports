import styles from "./Components.module.scss";
interface Props {
  label1: string;
  label2: string;
  handleleftBtn: () => void;
  handlelRightBtn: () => void;
}
const FooterBtn = ({
  label1,
  label2,
  handleleftBtn,
  handlelRightBtn,
}: Props) => {
  return (
    <footer className={`${styles.footer}`}>
      <div className={`${styles.footerWrapper}`}>
        <div className="d-flex w-100 justify-content-evenly">
          <button className="btn btn-outline-primary" onClick={handleleftBtn}>
            {label1}
          </button>
          <button className="btn btn-outline-danger">{label2}</button>
        </div>
        <div
          className={`${styles.startText} animate__animated animate__heartBeat animate__infinite mt-2`}
          onClick={handlelRightBtn}
        >
          Registrations closes soon
        </div>
      </div>
    </footer>
  );
};

export default FooterBtn;
