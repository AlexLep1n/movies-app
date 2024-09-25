import PropTypes from 'prop-types';
import classes from './CustomButton.module.css';

export default function CustomButton({ children, active, ...props }) {
  return (
    <button
      {...props}
      className={active ? `${classes.button} ${classes['button-active']}` : classes.button}
    >
      {children}
    </button>
  );
}

CustomButton.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool.isRequired,
};
