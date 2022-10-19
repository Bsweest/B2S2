import numbro from "numbro";

export default FormatInteractNumber = ({ total_hearts, followed, following }) => {
    const a = numbro(total_hearts).format({
        average: true,
        mantissa: a > 1000 ? 2 : 0,
    });
    const b = numbro(followed).format({
        average: true,
        mantissa: b > 1000 ? 2 : 0,
    });
    const c = numbro(following).format({
        average: true,
        mantissa: c > 1000 ? 2 : 0,
    });

    return [a, b, c];
}