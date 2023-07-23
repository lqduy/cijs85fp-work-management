import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faMagnifyingGlass,
  faTableList,
  faCircleHalfStroke,
  faEllipsis,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { faBell, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';

const tableIcon = <FontAwesomeIcon icon={faTableList} />;
const downCaretIcon = <FontAwesomeIcon icon={faAngleDown} />;
const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} />;
const bellIcon = <FontAwesomeIcon icon={faBell} size="lg" />;
const infoIcon = <FontAwesomeIcon icon={faQuestionCircle} size="lg" />;
const darkNLightIcon = <FontAwesomeIcon icon={faCircleHalfStroke} size="lg" />;
const threeDotsIcon = <FontAwesomeIcon icon={faEllipsis} />;
const checkIcon = <FontAwesomeIcon icon={faCheck} />;

export {
  tableIcon,
  downCaretIcon,
  searchIcon,
  bellIcon,
  infoIcon,
  darkNLightIcon,
  threeDotsIcon,
  checkIcon
};
