const Success =({isSuccess,isButtonPressed,isCup})=>{
    return(
        <>
        <div className="success">

            {
                isButtonPressed || isCup?(
                    <>
                        {isSuccess?(
                            <>
                            TARGET FOUND SUCCESSFULLY!!!
                            </>
                        ):(
                            <>
                            MISS!
                            </>
                        )}
                    </>
                ):(
                    <>
                    </>
                )
            }
            
        </div>
        </>
    )
}
export default Success;