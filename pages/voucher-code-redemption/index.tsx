const HomePage = () => {
    return (
        <div>
            <p>siema</p>
        </div>
    )
}

export const getServerSideProps = async (voucherCode: string) => {
    const response = await fetch("http://localhost:3000/pages/api/voucher-code-redemption/voucher.ts", {
        method: "POST",
        body: JSON.stringify({ voucherCode }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    console.log(data)
}

export default HomePage;