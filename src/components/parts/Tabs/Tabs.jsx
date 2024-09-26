import CustomButton from '../../ui/CustomButton/CustomButton';
import classes from './Tabs.module.css';
import PropTypes from 'prop-types';

export default function Tabs({ active }) {
  return (
    <ul className={classes.tabs}>
      <li>
        <CustomButton active={active}>Search</CustomButton>
      </li>
      <li>
        <CustomButton active={false}>Rated</CustomButton>
      </li>
    </ul>
  );
}

Tabs.propTypes = {
  active: PropTypes.bool.isRequired,
};
