import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

export const Flex = styled.div`
    -js-display: flex;
    display: flex;
    flex-direction: column;
`;

export const FlexCenter = styled(Flex)`
    justify-content: center;
    align-items: center;
`;

export const FlexRow = styled(Flex)`
    flex-direction: row;
    align-items: center;
`;

export const FlexRowCenter = styled(FlexRow)`
    justify-content: center;
`;

export const FlexOne = styled(Flex)`
    flex: 1;
`;

export const CustomTextField = styled(TextField)`
	background: #fff !important;
	border: 1px solid transparent;
	box-sizing: border-box !important;
	border-radius: 5px !important;
	color:#C7C9D9 !important;
	.MuiOutlinedInput-root {
		fieldset {
			border-color: transparent !important;
		}
		&:hover fieldset {
			border-color: #61C7B5 !important;
		}
		&.focused fieldset {
			border-color: #61C7B5 !important;
		}
  	}
	.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
		border-color: #61C7B5 !important;
	}
	.MuiInputLabel-outlined {
		color: #C7C9D9 !important;
	};
	.MuiFormLabel-root.Mui-focused {
		color: #61C7B5 !important;
	}

	.MuiFormLabel-root.Mui-error {
		color: ${(props) => props.errorColor ? '#f44336' : '#61C7B5'} !important;
	}
	.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline {
		border-color: ${(props) => props.errorColor ? '#f44336' : '#61C7B5'} !important;
	}
`;

export const FlexOneCenter = styled(FlexOne)`
    align-items: center;
    justify-content: center;
`;

export const ContainerData = styled(FlexRow)`
	justify-content: space-around;
	text-align: right;
`;

export const CustomFormControl = styled(FormControl)`
	min-width: ${(props) => props.minwidth};
	margin-top: 20px;
	text-align: ${(props) => props.talign};
`;

export const LabelText = styled.div`
	color: ${(props) => props.color};
	font-size: ${(props) => props.fsize}px;
	font-weight: ${(props) => props.fweight};
	margin: ${(props) => props.margin};
	text-align: ${(props) => props.talign};
	line-height: ${(props) => props.lheight};
	white-space:${(props) => props.wspace};
	cursor: ${(props) => props.cursor};
`;

export const FlexRowSpaceBetween = styled(FlexRow)`
	justify-content: space-between;
	width: 100%;
`;

export const CustomFlexLeft = styled(Flex)`
	align-items: flex-start;
	justify-content: flex-start;
`;


export const UploadFileContainer = styled(FlexRowSpaceBetween)`
	padding: 10px 20px;
	box-sizing: border-box;
	background-color: #fff;
	width: 100%;
	// border: 1px solid rgba(0, 0, 0, 0.06) !important;
	border-bottom: none;
	border-left: none;
	border-right: none;
`;