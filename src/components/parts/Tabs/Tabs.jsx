import CustomButton from '../../ui/CustomButton/CustomButton';
import classes from './Tabs.module.css';
import PropTypes from 'prop-types';

export default function Tabs({ active }) {
  return (
    <div className={classes.tabs}>
      <CustomButton active={true}>Search</CustomButton>
      <CustomButton active={active}>Rated</CustomButton>
    </div>
  );
}

Tabs.propTypes = {
  active: PropTypes.bool.isRequired,
};
