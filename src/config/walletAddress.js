const WalletAddress = (data, card) => {
    if (card == 1) {
        const first = data.slice(0, 8);
        const last = data.slice(-6, data.length);
        const showAddre = first + '...' + last;
        return showAddre;
    } else {
        const first = data.slice(0, 12);
        const last = data.slice(-10, data.length);
        const showAddre = first + '...' + last;
        return showAddre;
    }
}

export default WalletAddress;