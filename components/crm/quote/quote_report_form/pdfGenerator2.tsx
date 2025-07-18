import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import SimpleQuoteReport from '@/components/crm/quote/quote_report_form/simple_quote_report_form'
import { QuoteContext } from '../quoteContext';
import { isLastDayOfMonth } from 'date-fns';
import useLoading from '../../hooks/useLoading';
import { Spin } from 'antd';
import ModalInfo from '../quote_steps/info_mdal';
import QuoteReportPicker from './quote_report_picker';

const PdfGenerator2 = ({ isVisible = false, closePdfModal, isDownload = false }) => {
    const { recordId, shouldFetchDetailData, setShouldFetchDetailData,
        companyData, customerData, detailData } = useContext(QuoteContext)
    const captureRef = useRef(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    // const [isLoaded, setIsLoaded] = useState(false)

    const [template, setTemplate] = useState(0)

    useEffect(() => {
        detailData &&
            detailData.hasOwnProperty('print_template_id') &&
            detailData.print_template_id &&
            Number(detailData.print_template_id) &&
            setTemplate(Number(detailData.print_template_id))
    }, [detailData])

    useEffect(() => {
        if (isVisible) {
            setIsModalOpen(true)
            generatePdf();
            // closePdfModal();
        }
    }, [isVisible]);

    const generatePdf = () => {
        // setIsModalOpen(true)
        const element = captureRef.current
        // const element = document.getElementById('capture')

        const { offsetWidth, offsetHeight } = element;

        // This function is called when PdfGenerator becomes visible
        // You can perform any additional logic related to PDF generation here
        html2canvas(element).then((canvas) => {

            const pdf = new jsPDF('p', 'mm', 'a4');

            const imageData = canvas.toDataURL('image/png')

            // // // Calculate the scaling factor to fit the content width to the PDF page width
            // // const scaleFactor = pdf.internal.pageSize.width / canvas.width;

            // // Calculate the scaling factor based on the maximum of width and height ratios
            // const scaleFactor = Math.min(
            //     pdf.internal.pageSize.width / canvas.width,
            //     pdf.internal.pageSize.height / canvas.height
            // );

            // // Calculate the scaled dimensions
            // let scaledWidth = canvas.width * scaleFactor;
            // let scaledHeight = canvas.height * scaleFactor;
            // console.log(scaledWidth, scaledHeight)


            // // Calculate the starting coordinates to center the image
            // const startX = (pdf.internal.pageSize.width - scaledWidth) / 2;
            // const startY = (pdf.internal.pageSize.height - scaledHeight) / 2;
            // pdf.addImage(imageData, 'PNG', startX, startY, scaledWidth, scaledHeight);

            var imgWidth = 210;
            var pageHeight = 295;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            // var doc = new jsPDF('p', 'mm');
            var position = 0; // give some top padding to first page

            pdf.addImage(imageData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                // position += heightLeft - imgHeight; // top padding for other pages
                position = heightLeft - imgHeight + 5;
                pdf.addPage();
                pdf.addImage(imageData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            // pdf.addImage(imageData, 'PNG', 0, 0, scaledWidth, scaledHeight);
            isDownload ? pdf.save('Báo giá') : window.open(pdf.output('bloburl'), '_blank');
            closePdfModal(); // Close the PdfGenerator after PDF generation is complete
            // setIsLoaded(false)
        });
        setIsModalOpen(false)
    };

    return (
        // isVisible ? (
        <>
            <div
                style={{
                    position: 'fixed',
                    top: -9999,
                    left: -9999,
                    width: '210mm',
                    // height: '295mm',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: -1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 0,
                    padding: 0,
                }}
            >
                <div
                    id="capture"
                    ref={captureRef}
                    style={{
                        // maxWidth: '210mm',
                        width: '210mm',
                        // height: '295mm',
                        backgroundColor: '#fff',
                        // padding: '20px',
                        zIndex: -1000,
                    }}
                >
                    {/* <SimpleQuoteReport /> */}
                    <QuoteReportPicker template={template}/>
                </div>
            </div>

            <ModalInfo
                modal1Open={isModalOpen}
                setModal1Open={setIsModalOpen}
                title='Vui lòng chờ'
            />
        </>
        // ) : null
    );
};

export default PdfGenerator2