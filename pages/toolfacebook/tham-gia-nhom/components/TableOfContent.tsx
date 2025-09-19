import style from "../test/test.module.css";
import FilterNothing from "./FilterNothing";
import LoadingSkeleton from "./LoadingSkeleton";
import FetchError from "./fetchError";

interface TableOfContentProps {
    attributes?: string[];
    isLoading?: boolean;
    fetchError?: string | null;
    children?: React.ReactNode;
}

export default function TableOfContent({ attributes, isLoading, fetchError, children }: TableOfContentProps) {
    // input so thuoc tinh -> tao block
    attributes.length > 0 && console.log("Attributes:", attributes);
    // map: so cot = so thuoc tinh
  return (
    <>
        {/* goi list danh sach tai khoan */}
        <div className={style.TableContainer}>
            <div className={`${style.TableAttribute}`}>
                {attributes && attributes.map((attribute, index) => (
                    <div key={index} className={style.AttributeContent}>{attribute}</div>
                ))}
            </div>
            <div className={`${style.TableContentContainer}`}>
                {isLoading ? (
                <LoadingSkeleton style={style} />
                ) : fetchError ? (
                <FetchError fetchError={fetchError} />
                ) : attributes.length === 0 ? (
                // No data state
                <FilterNothing />
                ) : (
                // Vùng hiển thị Data map
                    children
                )}
            </div>
        </div>
    </>
  );
}