import React, { Fragment , cloneElement} from 'react'

const Loading = ({loading,error,children}) => {
    const elementType = children?.type?.render?.displayName;
    const renderHandler = () =>{
        const cloneButton = cloneElement(children,{disabled: true,},"Loading...")
        if(elementType === 'Button'){
        return (loading?(cloneButton):error?(<>{children}<p>{error}</p></>):<>{children}</>);
        }
    return(
            <Fragment>
                {loading?(<p>loading...</p>):error?(<p>{error}</p>):<>{children}</>}
            </Fragment>);
};

    return (renderHandler());
}

export default Loading;
