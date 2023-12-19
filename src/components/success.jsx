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
                    GUESS THE CORRECT CUP!
                    </>
                )
            }
            
        </div>
        </>
    )
}
export default Success;