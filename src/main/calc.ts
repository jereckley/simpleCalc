export class Calc {
	operands: number[] = []
	operators: string[] = []

	addOperand(op: string): string {
		return "foo"
	}

	addOperator(op: string): string {
		return "bar"
	}

	isOperator(op: string): boolean {
		return false
	}

	isOnlyAcceptingOperators(): boolean {
		return false
	}

	isReadyToReturnResult(): boolean {
		return false
	}

	getResult(): number {
		return 0
	}

}
