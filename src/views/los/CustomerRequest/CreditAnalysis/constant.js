import { CUSTOMER_DETAIL, PURPOSE } from "../../../../utility/Constants";
import PersonalPT from "./PersonalPT";
import TextEditorAnalysis from "./TextEditor";

export const CreditTitle = [
    {
        title: PURPOSE.toLocaleUpperCase(),
        content: <TextEditorAnalysis titleType={PURPOSE} />
    },
    {
        title: CUSTOMER_DETAIL.toLocaleUpperCase(),
        content: <TextEditorAnalysis titleType={CUSTOMER_DETAIL} />
    },
]
//     // ,
//     // {
//     //     title: "Financial Performance",
//     //     content: <FinancialPerformance />
//     // },
//     // {
//     //     title: "Documentation/Transaction Evidence",
//     //     content: <DocumentTransactionEvidence />
//     // },
//     // {
//     //     title: "Background Checking",
//     //     content: <BackgroundChecking />
//     // },
//     // {
//     //     title: "Collateral Type",
//     //     content: <CollateralType />
//     // },
//     // {
//     //     title: "Facility Type",
//     //     content: <FacilityType />
//     // }
// ]