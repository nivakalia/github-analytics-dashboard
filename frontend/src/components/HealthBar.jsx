function HealthBar({ score }) {

    return (

        <div
            style={{
                marginTop: "20px"
            }}
        >

            <h3>
                Health Score: {score}
            </h3>

            <div
                style={{
                    width: "100%",
                    height: "25px",
                    background: "#D7F1C6",
                    borderRadius: "10px"
                }}
            >

                <div
                    style={{
                        width: `${score}%`,
                        height: "100%",
                        borderRadius: "10px",
                        background:
                            score > 80
                            ? "#5CA829"
                            : score > 60
                            ? "#488320"
                            : "#335E17"
                    }}
                />

            </div>

        </div>

    );
}

export default HealthBar;