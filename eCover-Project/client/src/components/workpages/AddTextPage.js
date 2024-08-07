import React from "react";

const AddTextPage = ({  setAddTextSelected, 
                        setMyConversSelected, 
                        setMockupsSelected, 
                        setAIImagesSelected, 
                        setInsertImagesSelected, 
                        setStockImagesSelected, 
                        setUploadImagesSelected, 
                        setFinalizeSelected,
                        setBackgroundSelected}) => {
    // const mouseHovered = () => {
    //     setAddTextSelected(true);
    // };
    // const mouseOut = () => {
    //     setAddTextSelected(false);
    // }
    const headingClicked = () => {
        setAddTextSelected(false);
        setMyConversSelected(false);
        setMockupsSelected(false);
        setAIImagesSelected(false);
        setInsertImagesSelected(false);
        setStockImagesSelected(false);
        setUploadImagesSelected(false);
        setFinalizeSelected(false);
        setBackgroundSelected(false);
    }
    const subHeadingClicked = () => {
        setAddTextSelected(false);
        setMyConversSelected(false);
        setMockupsSelected(false);
        setAIImagesSelected(false);
        setInsertImagesSelected(false);
        setStockImagesSelected(false);
        setUploadImagesSelected(false);
        setFinalizeSelected(false);
        setBackgroundSelected(false);
    }
    const content = () => {
        setAddTextSelected(false);
        setMyConversSelected(false);
        setMockupsSelected(false);
        setAIImagesSelected(false);
        setInsertImagesSelected(false);
        setStockImagesSelected(false);
        setUploadImagesSelected(false);
        setFinalizeSelected(false);
        setBackgroundSelected(false);
    }
    return (
        <div className="add-text">
            {/* <div className="add-text-sub" onClick={headingClicked}>
                <img src="https://app.myecovermaker.com/app/images/icons/headlines.png" style={{width:'61px', height:'46px'}}  alt="heading" />
                <small>Heading</small>
            </div>
            <div className="add-text-sub" onClick={subHeadingClicked}>
                <img src="https://app.myecovermaker.com/app/images/icons/subheadline.png" style={{width:'61px', height:'46px'}} alt="subheading" />
                <small>Sub heading</small>
            </div>
            <div className="add-text-sub" onClick={content}>
                <img src="https://app.myecovermaker.com/app/images/icons/content.png" style={{width:'61px', height:'46px'}} alt="subheading" />
                <small>Contents</small>
            </div> */}
        </div>
    )
}

export default AddTextPage;