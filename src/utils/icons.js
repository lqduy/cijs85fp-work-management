import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faMagnifyingGlass,
  faTableList,
  faCircleHalfStroke,
  faEllipsis,
  faCheck,
  faStar as faStarSolid,
  faXmark,
  faAngleLeft,
  faPlus,
  faFilter,
  faExpand,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import {
  faBell,
  faClock,
  faPenToSquare,
  faQuestionCircle,
  faStar as faStarRegular
} from '@fortawesome/free-regular-svg-icons';

const tableIcon = <FontAwesomeIcon icon={faTableList} />;
const downCaretIcon = <FontAwesomeIcon icon={faAngleDown} />;
const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} />;
const bellIcon = <FontAwesomeIcon icon={faBell} size="lg" />;
const infoIcon = <FontAwesomeIcon icon={faQuestionCircle} size="lg" />;
const darkNLightIcon = <FontAwesomeIcon icon={faCircleHalfStroke} size="lg" />;
const threeDotsIcon = <FontAwesomeIcon icon={faEllipsis} />;
const checkIcon = <FontAwesomeIcon icon={faCheck} />;
const starRegularIcon = <FontAwesomeIcon icon={faStarRegular} />;
const starSolidIcon = <FontAwesomeIcon icon={faStarSolid} />;
const clockIcon = <FontAwesomeIcon icon={faClock} />;
const xIcon = <FontAwesomeIcon icon={faXmark} />;
const backCaretIcon = <FontAwesomeIcon icon={faAngleLeft} />;
const plusIcon = <FontAwesomeIcon icon={faPlus} />;
const editIcon = <FontAwesomeIcon icon={faPenToSquare} />;
const filterIcon = <FontAwesomeIcon icon={faFilter} />;
const viewModeIcon = <FontAwesomeIcon icon={faExpand} />;
const trashIcon = <FontAwesomeIcon icon={faTrash} />;

export {
  tableIcon,
  downCaretIcon,
  searchIcon,
  bellIcon,
  infoIcon,
  darkNLightIcon,
  threeDotsIcon,
  checkIcon,
  starRegularIcon,
  starSolidIcon,
  clockIcon,
  xIcon,
  backCaretIcon,
  plusIcon,
  editIcon,
  filterIcon,
  viewModeIcon,
  trashIcon
};
