import classes from './Button.module.css';

interface IProps {
  caption: string | number;
  action: Function;
  cssClass?: string;
  disabled?: boolean;
  isUnicode?: boolean;
}

export const Button = ({
  caption,
  action,
  cssClass,
  disabled = false,
}: IProps) => {
  const buttonCss = !disabled
    ? `${classes.btn} ${cssClass && classes[cssClass]}`
    : ` ${classes.disabled}`;
  const clickHandler = (ev?: React.FormEvent) => {
    ev?.preventDefault();
    action();
  };
  return (
    <button
      type='button'
      className={buttonCss}
      disabled={disabled}
      onClick={clickHandler}
    >
      {caption}
    </button>
  );
};
