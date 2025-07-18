/** @format */

import React, {useState} from 'react';
import styles from './TableOfContent.module.scss';
export default function TableOfContents() {
   const [openDropDown, setOpenDropDown] = useState(false);
   const [extend, setExtend] = useState(false);
   return (
      <div className={styles.tableofcontents}>
         <div className={styles.left}>
            <img src='../img/table_of_contents.png' alt='' className={styles.img_than_1024} />
            <img src='../img/table_of_contents_1024.png' alt='' style={{display: 'none'}} className={styles.img_1024} />
            <img src='../img/table_of_contents_768.png' alt='' style={{display: 'none'}} className={styles.img_768} />
            <img src='../img/table_of_contents_414.png' alt='' style={{display: 'none'}} className={styles.img_414} />
            <div className={styles.item}>
               <div className={styles.item_img}>
                  <img src='../img/arrow-square-down.png' alt='' />
               </div>
               <div className={styles.text}>1. Vai trò của CV xin việc quan trọng ra sao?</div>
            </div>
            <div className={styles.item}>
               <div className={styles.item_img} onClick={() => setOpenDropDown(!openDropDown)}>
                  {openDropDown ? <img src='../img/arrow-square-down_2.png' alt='' /> : <img src='../img/arrow-square-down_3.png' alt='' />}
               </div>
               <div className={styles.text} style={{color: openDropDown ? '#4C5BD4' : '#474747'}}>
                  2. Mẫu CV xin việc giúp quảng bá tốt hình ảnh ứng viên
               </div>
            </div>
            {openDropDown && (
               <>
                  <div className={styles.item}>
                     <div className={styles.item_img}>
                        <img src='../img/arrow-square-down.png' alt='' />
                     </div>
                     <div className={styles.text}>2.1 CV làm tốt vai trò cầu nối giữa ứng viên với doanh nghiệp</div>
                  </div>
                  <div className={styles.item}>
                     <div className={styles.item_img}>
                        <img src='../img/arrow-square-down.png' alt='' />
                     </div>
                     <div className={styles.text}>2.2 Mẫu CV xin việc giúp quảng bá tốt hình ảnh ứng viên</div>
                  </div>
                  <div className={styles.item}>
                     <div className={styles.item_img}>
                        <img src='../img/arrow-square-down.png' alt='' />
                     </div>
                     <div className={styles.text}>2.3 Vai trò của CV xin việc quan trọng ra sao?</div>
                  </div>
                  <div className={styles.item}>
                     <div className={styles.item_img}>
                        <img src='../img/arrow-square-down.png' alt='' />
                     </div>
                     <div className={styles.text}>2.4 CV làm tốt vai trò cầu nối giữa ứng viên với doanh nghiệp</div>
                  </div>
               </>
            )}
         </div>
         <div className={styles.right_wrap}>
            <div className={extend ? styles.right : `${styles.right} ${styles.active}`}>
               <div className={styles.top}>
                  <span>
                     Trong những năm gần đây, việc lựa chọn đúng mô hình phát triển phần mềm đã trở nên cấp thiết hơn bao giờ hết. Bởi nó sẽ giúp các nhà lập trình có thể tạo ra được một phần mềm theo một trình tự khoa học và tránh được các lỗi sai sót. Ở bài viết lần này, trang web timviec365.vn sẽ giúp các bạn tìm hiểu <a href='https://timviec365.vn/blog/mo-hinh-phat-trien-phan-mem-la-gi-new16845.html'>mô hình phát triển phần mềm là gì</a> và những loại mô hình phổ biến hiện nay.
                  </span>
               </div>
               <div className={styles.content}>
                  <div className={styles.title}>
                     <h2>1. Khái niệm về mô hình phát triển phần mềm là gì?</h2>
                  </div>
                  <div className={styles.desc}>
                     <span>
                        Mô hình phát triển phần mềm còn được biết đến với tên gọi là quy trình phát triển phần mềm. Nó chính là một tập hợp các kỹ thuật hay một hệ thống được tạo ra trên phần mềm máy tính. Trong mỗi trường hợp, mô hình phát triển phần mềm sẽ được người sử dụng với mục đích khác nhau nhưng suy cho cùng, nó sẽ được áp dụng để làm nên cấu trúc nhóm làm việc nhằm giúp người dùng làm nên các chức năng của phần mềm một cách hiệu quả nhất. Hầu hết các mô hình phát triển phần mềm đều cung cấp một framework. Đây là một cách thức được dùng để kiểm soát sự phát triển hệ thống thông tin.
                        Framework này sẽ bao gồm phát triển chương trình và các công cụ cần thiết để hỗ trợ cho sự phát triển.
                     </span>
                  </div>
                  <div className={styles.img}>
                     <img src='../img/image_table_of_contents.png' alt='' />
                  </div>
                  <div className={styles.title}>
                     <h2>1. Khái niệm về mô hình phát triển phần mềm là gì?</h2>
                  </div>
                  <div className={styles.desc}>
                     <span>
                        Mô hình phát triển phần mềm còn được biết đến với tên gọi là quy trình phát triển phần mềm. Nó chính là một tập hợp các kỹ thuật hay một hệ thống được tạo ra trên phần mềm máy tính. Trong mỗi trường hợp, mô hình phát triển phần mềm sẽ được người sử dụng với mục đích khác nhau nhưng suy cho cùng, nó sẽ được áp dụng để làm nên cấu trúc nhóm làm việc nhằm giúp người dùng làm nên các chức năng của phần mềm một cách hiệu quả nhất. Hầu hết các mô hình phát triển phần mềm đều cung cấp một framework. Đây là một cách thức được dùng để kiểm soát sự phát triển hệ thống thông tin.
                        Framework này sẽ bao gồm phát triển chương trình và các công cụ cần thiết để hỗ trợ cho sự phát triển.
                     </span>
                  </div>
                  <div className={styles.desc}>
                     <span>
                        Mô hình phát triển phần mềm còn được biết đến với tên gọi là quy trình phát triển phần mềm. Nó chính là một tập hợp các kỹ thuật hay một hệ thống được tạo ra trên phần mềm máy tính. Trong mỗi trường hợp, mô hình phát triển phần mềm sẽ được người sử dụng với mục đích khác nhau nhưng suy cho cùng, nó sẽ được áp dụng để làm nên cấu trúc nhóm làm việc nhằm giúp người dùng làm nên các chức năng của phần mềm một cách hiệu quả nhất. Hầu hết các mô hình phát triển phần mềm đều cung cấp một framework. Đây là một cách thức được dùng để kiểm soát sự phát triển hệ thống thông tin.
                        Framework này sẽ bao gồm phát triển chương trình và các công cụ cần thiết để hỗ trợ cho sự phát triển.
                     </span>
                  </div>
                  <div className={styles.title}>
                     <h2>1. Khái niệm về mô hình phát triển phần mềm là gì?</h2>
                  </div>
                  <div className={styles.desc}>
                     <span>
                        Mô hình phát triển phần mềm còn được biết đến với tên gọi là quy trình phát triển phần mềm. Nó chính là một tập hợp các kỹ thuật hay một hệ thống được tạo ra trên phần mềm máy tính. Trong mỗi trường hợp, mô hình phát triển phần mềm sẽ được người sử dụng với mục đích khác nhau nhưng suy cho cùng, nó sẽ được áp dụng để làm nên cấu trúc nhóm làm việc nhằm giúp người dùng làm nên các chức năng của phần mềm một cách hiệu quả nhất. Hầu hết các mô hình phát triển phần mềm đều cung cấp một framework. Đây là một cách thức được dùng để kiểm soát sự phát triển hệ thống thông tin.
                        Framework này sẽ bao gồm phát triển chương trình và các công cụ cần thiết để hỗ trợ cho sự phát triển.
                     </span>
                  </div>
                  <div className={styles.img}>
                     <img src='../img/image_table_of_contents.png' alt='' />
                  </div>
               </div>
               <div className={styles.bottom}>
                  <span>Mô hình phát triển phần mềm còn được biết đến với tên gọi là quy trình phát triển phần mềm. Nó chính là một tập hợp các kỹ thuật hay một hệ thống được tạo ra trên phần mềm máy tính. Trong mỗi trường hợp, mô hình phát triển phần mềm sẽ được người sử dụng với mục đích khác nhau nhưng suy cho cùng, nó sẽ được áp dụng để làm nên cấu trúc nhóm làm việc nhằm giúp người dùng làm nên các chức năng của phần mềm một cách hiệu quả nhất.</span>
                  <br />
                  <span>Hầu hết các mô hình phát triển phần mềm đều cung cấp một framework. Đây là một cách thức được dùng để kiểm soát sự phát triển hệ thống thông tin. Framework này sẽ bao gồm phát triển chương trình và các công cụ cần thiết để hỗ trợ cho sự phát triển.</span>
               </div>
            </div>
            <div className={styles.btn}>
               <button onClick={() => setExtend(!extend)}>{extend ? 'Rút gọn' : 'Xem thêm'}</button>
            </div>
         </div>
      </div>
   );
}






