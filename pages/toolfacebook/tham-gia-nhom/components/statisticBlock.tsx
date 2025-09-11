import style from '../styles.module.css';

interface statisticBlockProps {
    content?: string;
    count?: number;
    type?: string;
};

export default function StatisticBlock({content, count, type}: statisticBlockProps) {
    return (
        <div className={`${style.statBlock} ${style.BlockRow}`}>
            <div>
                <div className={style.marqueeBlock}>
                    <span>{content}</span>
                </div>
                <div className={style.countBlock}>
                    {count} {type}
                </div>
            </div>
            {/* <div className={style.iconBlock}>
                <DashboardChart />
            </div> */}
        </div>
    )
}