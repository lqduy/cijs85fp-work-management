import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  boardsListStorage,
  columnsListStorage,
  cardsListStorage,
} from "../../utils/local-storage";
import styles from "./TemplatePreview.module.scss";
import classNames from "classnames/bind";
import SidebarLayout from "../../layouts/SidebarLayout/SidebarLayout";
import bckThemesIconData from "../../utils/backgroundThemesIconData";
import ThemeContext from "../../contexts/ThemeContext";
import { templatesData } from "../../utils/templateData";
let cx = classNames.bind(styles);

const TemplatePreview = () => {
  const { currentImg } = useContext(ThemeContext);
  const { type, boardId } = useParams();
  // Use Templates
  const handleGetTemplate = (templateData) => {
    const boardId = templateData.board.boardId;
    const boardListData = boardsListStorage.load();
    const shouldAdd = !boardListData.some((board) => boardId === board.boardId);
    if (shouldAdd) {
      // Update board data
      const newBoardsListData = [...boardListData, templateData.board];
      boardsListStorage.save(newBoardsListData);

      // update columns data
      const columnsListData = columnsListStorage.load();
      const newColumnsListData = [...columnsListData, ...templateData.columns];
      columnsListStorage.save(newColumnsListData);

      // update cards data
      const cardsListData = cardsListStorage.load();
      const newCardsListData = [...cardsListData, ...templateData.cards];
      cardsListStorage.save(newCardsListData);
    }
  };
  return (
    <SidebarLayout>
      <div>
        {currentImg ? (
          <Link to={`/b/${templatesData.TemplateData.board.boardId}`}>
            <div>
              <img src={currentImg} />
            </div>
            <button onClick={() => handleGetTemplate(templatesData.TemplateData)}>
              Use This Template
            </button>
          </Link>
        ) : ("")}
      </div>
    </SidebarLayout>
  );
};
export default TemplatePreview;

{
  /* <div>
{currentImg ? (
  <Link to={`/b/${boardId}`}>
    <div>
      <img src={currentImg} />
    </div>
    <button onClick={() => handleGetTemplate(templatesData.data)}>
      Use This Template
    </button>
  </Link>
) : (
  ""
)}
</div> */
}
