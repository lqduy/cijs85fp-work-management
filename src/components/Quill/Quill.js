import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import classNames from "classnames/bind";
import "react-quill/dist/quill.snow.css";
import styles from './Quill.module.scss';
import Button from "../Button";
import {descriptionStorage} from "../../utils/local-storage"

let cx = classNames.bind(styles);

const Quill = () => {
  const [value, setValue] = useState("");
  const [saveData, setSaveData] = useState(false);
  const saveDataHandler = () => {
    setSaveData(true);
    console.log("chạy script")
    if (value!=="") {
      descriptionStorage.save(value);
      setValue("");
      setSaveData(false)
    }
    else return
  }
  const description =  {__html: descriptionStorage.load()};

  return (
    <div className={cx("card-wrapper")}>
      <div className={cx("card-wrapper")}>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
        />
      </div>
      <Button className={cx('createBtn')} onClick={saveDataHandler}> Save </Button>
      <div
        className={cx("view-data active")}
      dangerouslySetInnerHTML={description} />
    </div>
  );
};

export default Quill;
