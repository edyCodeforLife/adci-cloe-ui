import { LinearProgress, Box, Typography } from '@material-ui/core';
import { Fragment, memo } from 'react';
import styled from 'styled-components';

const CustomBox = styled(Box)`
	width: 50%;
	margin-left: 10px;
`;

const CustomLinearBar = styled(LinearProgress)`
	width: 100%;
	position: relative;
	& .MuiLinearProgress-barColorPrimary {
		background-color: #EF3E3E;
	}
`;

function _LinearProgressWithLabel(props) {
	return (
		<CustomBox display="flex" alignItems="center">
			<Box width="100%" mr={1}>
				<CustomLinearBar variant="determinate" {...props} />
			</Box>
			<Box minWidth={35}>
				<Typography variant="body2" color="textSecondary">{`${Math.round(
					props.value,
				)}%`}</Typography>
			</Box>
		</CustomBox>
	);
}

export const LinearProgressWithLabel = memo(_LinearProgressWithLabel);