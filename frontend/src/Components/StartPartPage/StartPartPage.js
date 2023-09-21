import Breadcrumbs from '~/Components/Breadcrumbs/Breadcrumbs';
import styles from '~/Components/StartPartPage/StartPartPage.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function StartPartPage({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Breadcrumbs></Breadcrumbs>
                <h1 className={cx('page-title')}>{children}</h1>
            </div>
            <p className={cx('product-quantity')}>100 product</p>
        </div>
    );
}

export default StartPartPage;