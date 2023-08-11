import React from "react";
import classNames from "classnames/bind";
import styles from "./Templates.module.scss";
import bckThemesIconData from "../../utils/backgroundThemesIconData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  boardsListStorage,
  columnsListStorage,
  cardsListStorage,
} from "../../utils/local-storage";
import SidebarLayout from "../../layouts/SidebarLayout/SidebarLayout";
let cx = classNames.bind(styles);
const Templates = () => {
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
      <div className={cx("wrapper")}>
        <div className={cx("theme-top")}>
          <div className={cx("theme-title")}>
            <p>Featured categories</p>
            <form className={cx("theme-form")}>
              <input placeholder={cx("Find Template")} />
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </form>
          </div>
          <ul className={cx("theme-list-categories")}>
            {bckThemesIconData.map((item) => {
              return (
                <Link
                  to={`/b/${item.data.board.boardId}`}
                  onClick={() => handleGetTemplate(item.data)}
                >
                  <li>
                    <img src={item.img} alt={item.title} />
                    <span>{item.title}</span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Templates;
// const handleGetTemplate = (templateData) => {
//   const boardId = templateData.board.boardId;
//   const boardListData = boardsListStorage.load();
//   const shouldAdd = !boardListData.some((board) => boardId === board.boardId);
//   if (shouldAdd) {
//     // Update board data
//     const newBoardsListData = [...boardListData, templateData.board];
//     boardsListStorage.save(newBoardsListData);

//     // update columns data
//     const columnsListData = columnsListStorage.load();
//     const newColumnsListData = [...columnsListData, ...templateData.columns];
//     columnsListStorage.save(newColumnsListData);

//     // update cards data
//     const cardsListData = cardsListStorage.load();
//     const newCardsListData = [...cardsListData, ...templateData.cards];
//     cardsListStorage.save(newCardsListData);
//   }

// {bckThemesIconData.map((item) => {
//   return (
//     <Link
//      to={`/b/${item.data.board.boardId}`}
//      onClick={() => handleGetTemplate(item.data)}
//     >
//       <li>
//         <img src={item.img} alt={item.title} />
//         <span>{item.title}</span>
//       </li>
//     </Link>
//   );
// })}
