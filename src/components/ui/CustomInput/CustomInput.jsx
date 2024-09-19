import classes from './CustomInput.module.css';

export default function CustomInput(props) {
  return <input className={classes.input} {...props} />;
}
