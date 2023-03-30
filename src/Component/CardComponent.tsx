

import React from 'react'

type Props = {
    title?: string;
    children?: React.ReactNode
};

export const CardComponent = (props: Props) => {

    return (
        <div className="card">
            <div className="card-header">
                {props.title}
            </div>
            <div className="card-body">
                {props.children}
            </div>
        </div>
    )
}