import React from 'react'
import { useDispatch } from 'react-redux';
import RichText from '../../../../../@core/components/rich-text'
import { setCustomerDetailContent, setPurposeContent } from '../../../../../redux/creditAnalysis';
import { CUSTOMER_DETAIL, PURPOSE } from '../../../../../utility/Constants';

const TextEditorAnalysis = (props) => {

    const { titleType } = props;
    const dispatch = useDispatch();

    const handleText = (newContent) => {
        if (titleType == PURPOSE) {
            dispatch(setPurposeContent(newContent))
        } else if (titleType == CUSTOMER_DETAIL) {
            dispatch(setCustomerDetailContent(newContent))
        }
    }

    return (
        <>
            <RichText type={titleType} handleText={handleText} />
        </>
    )
}

export default TextEditorAnalysis