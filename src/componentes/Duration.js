export default function Duration({ duration }) {
    const valueOne = duration.split(" ")[0]
    const valueTwo = duration.split(" ")[2]

    const time = valueTwo === "per"
        ? `${valueOne}min p/ep`
        : `${valueOne}H : ${valueTwo}min`
    
    return time;
}