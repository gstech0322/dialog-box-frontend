const SoldAt = (date) => {

    let soldAt = "";

    for (let i = 0; i < 10; i++) {
        soldAt += date.charAt(i);
    }

    return soldAt;
}

export default SoldAt;