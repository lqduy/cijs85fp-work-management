import React, { useCallback, useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill";
import classNames from "classnames/bind";
import "react-quill/dist/quill.snow.css";
import styles from "./TextEditor.module.scss";
import Button from "../Button";
import { cardsListStorage } from "../../utils/local-storage";
import { FORM_MODE } from "../../utils/constants";
import { penIcon } from "../../utils/icons";

let cx = classNames.bind(styles);

const TextEditor = ({ cardId, cardDescription }) => {
  const [descValue, setDescValue] = useState(cardDescription);
  const [formMode, setFormMode] = useState(FORM_MODE.ADD);

  const hasInitialValues = cardId && cardDescription;
  const initialValues = cardDescription;
  console.log(cardDescription)
  const handleUpdateCardDescription = () => {
    if (descValue !== "") {
      const cardsListData = cardsListStorage.load();
      const newCardsListData = cardsListData.map((card) =>
        card.cardId === cardId ? { ...card, description: descValue } : card
      );
      cardsListStorage.save(newCardsListData);
    }
    setFormMode(FORM_MODE.ADD);
  };

  useEffect(() => {
    if (hasInitialValues) {
      setDescValue(initialValues);
    } else setDescValue('');
  }, [initialValues]);

  const controlDataHandler = (e) => {
    e.preventDefault();
    handleUpdateCardDescription(e);
  };

  return (
    <div className={cx("card-wrapper")}>
      <div className={cx("card-wrapper")}>
        <ReactQuill
          theme="snow"
          value={descValue}
          onChange={setDescValue}
        />
      </div>
      <Button className={cx("createBtn")} onClick={controlDataHandler}>
        Save
      </Button>
      <div className={cx("display-descr")}>
        <div dangerouslySetInnerHTML={{__html: descValue}} />
        <span
          className={cx("editIcon")}
          onClick={() => controlDataHandler}
        >
          {penIcon}
        </span>
      </div>
    </div>
  );
};

export default TextEditor;
