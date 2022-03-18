import React from 'react';

export default interface GraphProps {
    id: number,
    empty: boolean,
    deletable: boolean,
    deleteSelf?: (id: number) => void
}