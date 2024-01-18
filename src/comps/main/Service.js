import '../main/Service.css';

function Service(props) {
    return (
        <>
                <div className="serchild" >
                    <img src={props.img_path} alt="none" width="283px"/>
                    <h3>{props.title}</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque ducimus cum atug.</p>
                </div>
        </>
    )
}

export default Service;