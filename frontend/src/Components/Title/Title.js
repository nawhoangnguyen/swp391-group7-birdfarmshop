import styles from '~/Components/Title/Title.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Title({ children, className, system, ...passProps }) {
    const props = {
        system,
        ...passProps,
    };

    const classes = cx('title', { [className]: className, system });
    return (
        <h1 className={classes} {...props}>
            {children}
        </h1>
    );
}

export default Title;
