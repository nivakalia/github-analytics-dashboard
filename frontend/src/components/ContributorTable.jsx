function ContributorTable({ contributors }) {

    return (

        <div
            style={{
                maxWidth: "700px",
                padding: "10px"
            }}
        >
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    textAlign: "left"
                }}
            >

                <thead>

                    <tr
                        style={{
                            backgroundColor: "#D7F1C6"
                        }}
                    >
                        <th
                            style={{
                                padding: "12px"
                            }}
                        >
                            Rank
                        </th>

                        <th
                            style={{
                                padding: "12px"
                            }}
                        >
                            Contributor
                        </th>

                        <th
                            style={{
                                padding: "12px"
                            }}
                        >
                            Contributions
                        </th>

                        <th
                            style={{
                                padding: "12px"
                            }}
                        >
                            Share
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {contributors.map(
                        (person, index) => (

                        <tr
                            key={person.login}
                            style={{
                                borderBottom:
                                "1px solid #ddd"
                            }}
                        >
                            <td
                                style={{
                                    padding: "12px"
                                }}
                            >
                                {index + 1}
                            </td>

                            <td
                                style={{
                                    padding: "12px",
                                    fontWeight: "bold"
                                }}
                            >
                                {person.login}
                            </td>

                            <td
                                style={{
                                    padding: "12px"
                                }}
                            >
                                {person.contributions.toLocaleString()}
                            </td>

                            <td
                                style={{
                                    padding: "12px"
                                }}
                            >
                                {person.percentage}%
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default ContributorTable;