import { Box } from '@mui/material';
import React from 'react';
import nodata from '../assets/images/nodata.png';

export default function NoData() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
        >
            <img src={nodata} alt="" style={{
                width: '60%',
                height: '60%',
                objectFit: 'contain',
                margin: '0 auto',
            }}
            />
        </Box>
    );
}