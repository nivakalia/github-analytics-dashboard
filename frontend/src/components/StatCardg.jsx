function StatCardg({ title, value }) {

    return (
        <div
            style={{
                padding: "20px",
                width: "200px",
                margin: "10px",
                background: "#D7F1C6",
                alignContent:"center",
                borderRadius: "12px"
            }}
        >
            <h3>{title}</h3>
            <h2>{value}</h2>
        </div>
    );
}
export default StatCardg;