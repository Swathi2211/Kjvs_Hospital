import React from 'react';
import { Skeleton } from 'primereact/skeleton';
import './main.css';// Import your custom CSS file
import { ProgressSpinner } from 'primereact/progressspinner';

export default function LoadingSkeleton() {
    return (
        <>
            <div className="loading-skeleton">
                <Skeleton shape="rect" width="100%" height="200px" className="flowing-animation" />

            </div>
            <div className="three-dots-loader">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </>
    );
}
