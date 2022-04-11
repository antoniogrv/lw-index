import React from 'react';

export default interface GraphProps {
    id: number,

    isEmpty: boolean,
    isDeletable: boolean,
    isAnalyzable: boolean,

    deleteSelf?: (id: number) => void

    data?: any[]
}