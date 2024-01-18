import '../main/Dark.css';

function Dark(props) {
    return (
        <>
            <div className="darchild" style={{display:"flex", backgroundColor:"rgba(7, 15, 105, 0)", padding:"20px", marginTop:"10px"}}>
                <div>
                    <i class={props.icon} style={{borderRadius:"100%", border:"1px solid white", padding:"20px", fontSize:"40px", marginTop:"15px", marginRight:"20px", color:"rgba(2, 150, 78, 0.848)", backgroundColor:"white"}}></i>
                </div>
                <div>
                    <h3 style={{color:"white"}}>{props.title}</h3>
                    <p style={{color:"white"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque ducimus cum atug.</p>
                </div>
            </div>
        </>
    )
}

export default Dark;