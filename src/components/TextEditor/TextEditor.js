import React, { useCallback, useEffect, useState, useRef } from "react";
import { OPEN_EDITOR } from "../../utils/constants";
import ReactQuill from "react-quill";
import classNames from "classnames/bind";
import "react-quill/dist/quill.snow.css";
import styles from "./TextEditor.module.scss";
import Button from "../Button";
import { cardsListStorage } from "../../utils/local-storage";
import { penIcon } from "../../utils/icons";

let cx = classNames.bind(styles);

const TextEditor = ({ cardId, cardDescription }) => {
  const [descValue, setDescValue] = useState(cardDescription);
  const [editor, setEditor] = useState(OPEN_EDITOR.CLOSE);
  const hasInitialValues = cardId && cardDescription;
  const initialValues = cardDescription;

  const handleUpdateCardDescription = () => {
    if (descValue !== "") {
      const cardsListData = cardsListStorage.load();
      const newCardsListData = cardsListData.map((card) =>
        card.cardId === cardId ? { ...card, description: descValue } : card
      );
      cardsListStorage.save(newCardsListData);
    }
    setEditor(OPEN_EDITOR.CLOSE);
  };

  useEffect(() => {
    if (hasInitialValues) {
      setDescValue(initialValues);
    } else setDescValue("");
  }, [initialValues]);

  const controlDataHandler = (e) => {
    e.preventDefault();
    handleUpdateCardDescription(e);
  };

  return (
    <div className={cx("card-wrapper")}>
      <div className={cx("text-editor-wrapper")}>
        {editor === OPEN_EDITOR.OPEN ? (
          <ReactQuill
            theme="snow"
            value={descValue}
            onChange={setDescValue}
            className={cx("text-editor-wrapper")}
          />
        ) : (
          <ReactQuill
            theme="snow"
            value={descValue}
            onChange={setDescValue}
            className={cx("hidden")}
          />
        )}
      </div>

      <Button
        className={
          editor === OPEN_EDITOR.OPEN ? cx("createBtn") : cx("hidden")
        }
        onClick={controlDataHandler}
      >
        Save
      </Button>

      <div
        className={
          editor === OPEN_EDITOR.OPEN
            ? cx("hidden")
            : cx("display-descr")
        }
      >
        <div dangerouslySetInnerHTML={{ __html: descValue }} />
        <span
          className={
            editor === OPEN_EDITOR.OPEN
              ? cx("hidden") :  cx("edit-icon")}
          onClick={() => setEditor(OPEN_EDITOR.OPEN)}
        >
          {penIcon}
        </span>
      </div>
    </div>
  );
};

export default TextEditor;
