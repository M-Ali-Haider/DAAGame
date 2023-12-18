const Success =({isSuccess,isButtonPressed})=>{
    return(
        <>
        <div className="success">

            {
                isButtonPressed?(
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