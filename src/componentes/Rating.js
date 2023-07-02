import "./Rating.css"

export default function Rating({ rating }) {
    let value;
    let color;
    const valor = rating.split(" - ")[0];

    switch (valor) {
        case "G":
            value = "L";
            color = "green";
            break;
        case "PG":
            value = "10";
            color = "blue";
            break;
        case "PG-13":
            value = "14";
            color = "orange";
            break;
        default:
            value = "+18";
            color = "red";
            break;
    }
    return (
        <div className="rating" style={{backgroundColor: color}}>
            { value }
        </div>
    )
}