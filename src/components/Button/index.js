import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Button.module.scss';

let cx = classNames.bind(styles);

const Button = ({
  children,
  className,
  to,
  href,
  leftIcon,
  rigthIcon,
  large,
  rounded,
  circled,
  fullWidth,
  onClick,
  ...rest
}) => {
  let ElementTag = 'button';

  const props = {
    onClick,
    ...rest
  };

  if (to) {
    props.to = to;
    ElementTag = Link;
  } else if (href) {
    props.to = href;
    ElementTag = 'a';
  }

  const classes = cx('default', {
    [className]: className,
    large: large,
    rounded: rounded,
    circled: circled,
    fullWidth: fullWidth
  });

  return (
    <ElementTag className={classes} {...props}>
      {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
      <span className={styles.title}>{children}</span>
      {rigthIcon && <span className={styles.icon}>{rigthIcon}</span>}
    </ElementTag>
  );
};

Button.defaultProps = {
  large: false,
  rounded: false,
  circled: false,
  fullWidth: false
};

export default Button;
