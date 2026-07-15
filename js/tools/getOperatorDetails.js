export function getOperatorDetails(operatorCodes, operators) {
    return operatorCodes
        .map(code =>
            operators.find(
                operator => operator.OperatorCode === code
            )
        )
        .filter(Boolean);
}