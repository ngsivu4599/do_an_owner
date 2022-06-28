import React from 'react';
import withAuth from '../HOC/withAuth';

const DashBoard = () => {
    return (
        <div>
            DashBoard
        </div>
    );
};

export default withAuth(DashBoard);