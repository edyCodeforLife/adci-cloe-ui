import React, { useState, useEffect } from 'react';
import BreadCrumbs from '../../../../@core/components/breadcrumbs';
import MainCard from '../../../../@core/layouts/components/custom/MainCard';
import { HistoryTransactionDetailTable } from '../TableHistory/TableHistoryDetail';
import { MerchantService } from '../../../../data/business/index';
import { QrsToObj } from '../../../../utility/function';
import { find } from 'lodash';
import { FlexOne, FlexRow } from '../../../../@core/components/styled-components/custom-component';

const LoanLimitHistory = () => {
	const qrs = QrsToObj(window.location.search);
	const _loanlimitreqId = qrs?.id;
	const _service = new MerchantService()
	const [dataTableCM, setDataTableCM] = useState([]);
	const [dataTableCMAPUPPT, setDataTableCMAPUPPT] = useState({});
	const [masterData, setMasterData] = useState({});

	useEffect(() => {
		_service.getCMApprovedLoanLimitRequestHistoryDetail(_loanlimitreqId, {
			Success: (res) => {
				setMasterData(res?.data);
				setDataTableCM(res?.data?.uploadDocumentForReviews)
				setDataTableCMAPUPPT(res?.data?.apupptScoringAssessmentResult)
			}
		})
	}, []);

	const redirectTo = (link) => {
		const anchorEl = document.createElement('a');

		anchorEl.href = link;
		anchorEl.target = '_blank';
		anchorEl.rel = 'noopener';
		setTimeout(() => {
			anchorEl.click();
		});
	}

	const configTable = {
		title: ["Doc Group", "Doc Label", "Doc Name", "Doc Url 1", "Doc Url 2", "Doc Year", "Remark Document 1", "Remark Document 2", "Doc Type", "Verified Document 1", "Verified Document 2"],
		data: dataTableCM
	}

	const configTableAPUPPT = {
		title: ["APUPPT Score ID", "Borrower Type", "Loan Purpose Name", "Address Name", "Citizenship", "Income", "Product Type", "Total Loan", "Total Score", "Risk Status "],
		data: dataTableCMAPUPPT
	}

	return (<>
		<BreadCrumbs title='Loan Limit History' data={[{ title: 'Loan' }, { title: 'Loan Limit History' }]} />
		<MainCard styled={{
			boxSizing: "border-box",
			width: "100%",
			position: "relative",
			overflow: "scroll"
		}}>
			{dataTableCM.length > 0 ? (
				<HistoryTransactionDetailTable
					striped
					configTable={configTable}
					isCMTable={true}
					redirectTo={redirectTo}
					isUploadDocsReviews={true}
				/>
			) : "Tidak Ditemukan Data Dokumen history"}

		</MainCard>

		<MainCard styled={{
			boxSizing: "border-box",
			width: "100%",
			position: "relative",
			overflow: "scroll"
		}}>
			{dataTableCMAPUPPT ? (
				<HistoryTransactionDetailTable
					striped
					configTable={configTableAPUPPT}
					isCMTable={true}
					redirectTo={redirectTo}
					isUploadDocsReviews={false}
				/>
			) : "Tidak Ditemukan Data APUPPT"}

		</MainCard>

		{(masterData?.icrFinalScore || masterData?.icrScoreAmount) && (
			<MainCard styled={{
				boxSizing: "border-box",
				width: "100%",
				position: "relative",
				overflow: "scroll"
			}}>
				<h3>
					ICR Final Score Result
				</h3>
				{masterData?.icrFinalScore && (
					<FlexRow style={{ margin: "20px 0px" }}>
						<FlexOne>
							<strong>
								ICR FInal Score:
							</strong>
						</FlexOne>
						<FlexOne>
							{masterData?.icrFinalScore}
						</FlexOne>
					</FlexRow>
				)}

				{masterData?.icrScoreAmount && (
					<FlexRow>
						<FlexOne>
							<strong>
								ICR Score Amount:
							</strong>
						</FlexOne>
						<FlexOne>
							{masterData?.icrScoreAmount}
						</FlexOne>
					</FlexRow>
				)}

			</MainCard>
		)}

		{masterData?.creditMemoCustomerDetail && (
			<MainCard styled={{
				boxSizing: "border-box",
				width: "100%",
				position: "relative",
				overflow: "scroll"
			}}>
				<h3>
					Credit Memo Customer Detail
				</h3>
				<div
					dangerouslySetInnerHTML={{
						__html: atob(masterData?.creditMemoCustomerDetail)
					}} />
			</MainCard>
		)}

	</>);
}

export default LoanLimitHistory;