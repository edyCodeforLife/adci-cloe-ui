import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Label } from 'reactstrap';
import { TextSize } from '../../../../../utility/ConstNum';

const MainLabel = ({
    align, size, children, weight, color, className, rest
}) => {

    const validTextSize = ["h1", "h2", "h3", "h5", 'h6', '12px', "nm"];

    const labelStyle = {
        fontSize: validTextSize.find((sz) => sz === size) ? TextSize[size] : TextSize["nm"],
        alignSelf: align,
        color: color,
        fontWeight: weight,
        ...rest
    };

    return (
        <Label style={labelStyle} className={className}>
            {children}
        </Label>
    );
}

MainLabel.defaultProps = {
    align: "center",
    size: "12px",
    weight: "none"
};

export default MainLabel;