import style from "../test/test.module.css";
import FilterNothing from "./FilterNothing";
import LoadingSkeleton from "./LoadingSkeleton";
import FetchError from "./fetchError";

interface TableOfContentProps {
    attributes?: string[];
    contents?: any[];
    isLoading?: boolean;
    fetchError?: string | null;
}

export default function TableOfContent({ attributes, isLoading, fetchError, contents }: TableOfContentProps) {
    // input so thuoc tinh -> tao block
    attributes.length > 0 && console.log("Attributes:", attributes, contents);
    // map: so cot = so thuoc tinh
  return (
    <>
        {/* goi list danh sach tai khoan */}
        <div className={style.TableContainer}>
            <div className={`${style.TableAttribute} ${style.TableWidthAdjust}`}>
                <div className={style.AttributeContent}><input type="checkbox" /></div>
                {attributes && attributes.map((attribute, index) => (
                    <div key={index} className={style.AttributeContent}>{attribute}</div>
                ))}
            </div>
            {isLoading ? (
            <LoadingSkeleton style={style} />
            ) : fetchError ? (
            <FetchError fetchError={fetchError} />
            ) : attributes.length === 0 ? (
            // No data state
            <FilterNothing />
            ) : (
            // Vùng hiển thị Data map
            <div>
                {contents.map((content) => (
                    <div className={`${style.TableContent} ${style.TableWidthAdjust}`}>
                        <div className={style.BlockContent}><input type="checkbox" /></div>
                        <div className={style.BlockContent}>{content.name}</div>
                        <div className={style.BlockContent}>{content.account}</div>
                        <div className={style.BlockContent}>{content.password}</div>
                        <div className={style.BlockContent}>{content.device}</div>
                        <div className={style.BlockContent}>{content.status}</div>
                        <div className={style.BlockContent}>{content.actions}</div>
                    </div>
                ))}
            </div>
            )}
        </div>
    </>
  );
}