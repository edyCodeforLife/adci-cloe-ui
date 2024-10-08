import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import CardActions from '../../../components/card-actions';

const MainCard = forwardRef(({ title, component, children, className, secTitle, styled, icon, actions, bodyOnly }, ref) => {
    const { t } = useTranslation();

    //action ['collapse', 'reload', 'remove'] / 'collapse

    return (
        actions ?
            <CardActions title={title} actions={actions} style={styled}>
                <CardBody>
                    {children}
                </CardBody>
            </CardActions> :
            <Card style={styled} className={className}>
                {title ?
                    <CardHeader>
                        <CardTitle>{t(title)}</CardTitle>
                        {
                            secTitle ? <CardTitle>{t(secTitle)}</CardTitle>:null
                        }
                    </CardHeader> : null
                }
                {
                    <CardBody>
                        {children}
                    </CardBody>
                }
            </Card>
    );
});

MainCard.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string
};

export default MainCard;