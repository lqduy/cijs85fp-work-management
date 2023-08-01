import { useEffect, useState, useContext } from 'react';
import classNames from 'classnames/bind';
import {
  DndContext,
  MouseSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';

import styles from './SubBoardPage.module.scss';
import { useParams } from 'react-router-dom';
import { boardsListStorage, columnsListStorage } from '../../utils/local-storage';
import Button from '../../components/Button';
import { plusIcon } from '../../utils/icons';
import AddForm from './AddForm';
import ThemeContext from '../../contexts/ThemeContext';
import Column from './Column';
import SubBoardHeader from './SubBoardHeader';
import { ACTIVE_DRAG_ITEM_TYPE, DISTANCE_TO_ACTIVATED_DND } from '../../utils/constants';
import Card from './Card';

let cx = classNames.bind(styles);

const SubBoardPage = () => {
  const { boardId } = useParams();
  const [boardData, setBoardData] = useState({});
  const [columnsData, setColumnsData] = useState([]);
  const [openAddColumnForm, setOpenAddColumnForm] = useState(false);
  // const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [draggingOverColumnId, setDraggingOverColumnId] = useState(null);
  const [overCardId, setOverCardId] = useState(null);
  const [overCardIndex, setOverCardIndex] = useState(null);
  const [isDragEnd, setIsDragEnd] = useState(false);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: DISTANCE_TO_ACTIVATED_DND // Enable sort function when dragging 10px
    }
  });
  const sensors = useSensors(mouseSensor);

  const { darkMode } = useContext(ThemeContext);

  const handleFetchData = () => {
    const boardsListData = boardsListStorage.load();
    const boardData = boardsListData.find(board => board.boardId === boardId);
    setBoardData(boardData);

    const columnsListData = columnsListStorage.load();
    const columnsData = columnsListData.filter(column => column.parentId === boardId);
    setColumnsData(columnsData);

    // Update lastVisting
    const time = new Date().getTime();
    const newBoardsListData = boardsListData.map(board =>
      board.boardId === boardId ? { ...board, lastVisiting: time } : board
    );
    boardsListStorage.save(newBoardsListData);
  };

  useEffect(() => {
    handleFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { boardTitle, boardImageBg, boardColorBg } = boardData;

  const handleAddNewColumn = newColumn => {
    const newColumnsList = [...columnsData, newColumn];
    setColumnsData(newColumnsList);

    const columnsListData = columnsListStorage.load();
    const newColumnsListData = [...columnsListData, newColumn];
    columnsListStorage.save(newColumnsListData);
  };

  const handleRemoveColumn = columnId => {
    const newColumnsList = columnsData.filter(column => column.columnId !== columnId);
    setColumnsData(newColumnsList);

    const columnsListData = columnsListStorage.load();
    const newColumnsListData = columnsListData.filter(column => column.columnId !== columnId);
    columnsListStorage.save(newColumnsListData);
  };

  const handleDragStart = e => {
    // setActiveDragItemId(e?.active?.id);
    setActiveDragItemType(
      e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.COLUMN : ACTIVE_DRAG_ITEM_TYPE.CARD
    );
    setActiveDragItemData(e?.active?.data?.current);
  };

  const handleDragOver = e => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;
    const { active, over } = e;
    if (!active || !over) return;

    const {
      id: overCardId,
      data: { current: overDraggingCardData }
    } = over;

    const overColumnId = overDraggingCardData?.cardId
      ? overDraggingCardData.parentId
      : overDraggingCardData.columnId;

    const overCardIndex = overDraggingCardData?.cardIndex;
    const cardsLength = overDraggingCardData?.cardsLength;
    const isBelowOverItem =
      active.rect.current.translated &&
      active.rect.current.translated.top > over.rect.top + over.rect.height;
    const modifier = isBelowOverItem ? 1 : 0;
    const newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : cardsLength + 1;

    setDraggingOverColumnId(overColumnId);
    setOverCardIndex(newCardIndex);
    setOverCardId(overCardId);
  };

  const handleDragEnd = e => {
    const { active, over } = e;
    if (!active || !over) return;
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      setIsDragEnd(true);
    }
    if (active.id !== over.id) {
      const oldIndex = columnsData.findIndex(column => column.columnId === active.id);
      const newIndex = columnsData.findIndex(column => column.columnId === over.id);
      const dndOrderedColumns = arrayMove(columnsData, oldIndex, newIndex);
      setColumnsData(dndOrderedColumns);

      const columnsListData = columnsListStorage.load();
      let newColumnsListData = columnsListData.filter(column => column.parentId !== boardId);
      newColumnsListData = [...newColumnsListData, ...dndOrderedColumns];
      columnsListStorage.save(newColumnsListData);
    }
    // setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
  };

  const pageBackground =
    (boardImageBg && { backgroundImage: `url(${boardImageBg})` }) ||
    (boardColorBg && { backgroundColor: boardColorBg });

  const columnIdsList = columnsData?.map(column => column.columnId);

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={cx('wrapper', { 'dark-layer': darkMode })} style={pageBackground}>
        {boardTitle && <SubBoardHeader boardData={boardData} />}
        <div className={cx('columns-list')}>
          <SortableContext items={columnIdsList} strategy={horizontalListSortingStrategy}>
            <div className={cx('columns-list__core')}>
              {/* Render Column */}
              {columnsData?.map(column => (
                <Column
                  key={column.columnId}
                  columnData={column}
                  handleRemoveColumn={handleRemoveColumn}
                  isDragEnd={isDragEnd}
                  handleResetDragging={() => setIsDragEnd(false)}
                  isGiver={
                    activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD &&
                    column.columnId === activeDragItemData.parentId
                  }
                  isReceiver={
                    activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD &&
                    column.columnId === draggingOverColumnId
                  }
                  overCardId={overCardId}
                  overCardIndex={overCardIndex}
                  activeDragItemData={activeDragItemData ? activeDragItemData : undefined}
                />
              ))}
            </div>
            <DragOverlay dropAnimation={dropAnimation}>
              {!activeDragItemType && null}
              {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
                <Column columnData={activeDragItemData} />
              )}
              {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
                <Card cardData={activeDragItemData} />
              )}
            </DragOverlay>
          </SortableContext>
          {/* Add Column Form/Button */}
          {openAddColumnForm ? (
            <div className={cx('add-column-form')}>
              <AddForm
                isAddColumnForm
                boardId={boardId}
                setCloseAddColumnForm={() => setOpenAddColumnForm(false)}
                handleAddNewColumn={handleAddNewColumn}
              />
            </div>
          ) : (
            <Button
              leftIcon={plusIcon}
              className={cx('add-column-btn')}
              onClick={() => setOpenAddColumnForm(true)}
            >
              Add another column
            </Button>
          )}
        </div>
      </div>
    </DndContext>
  );
};

export default SubBoardPage;
