export class Calc {
	operands: string[] = [];

	addOperand(op: string): string {
		const num = parseFloat(op)
		if (isNaN(num)) {
			if (this.operands.length >= 2) {
				throw new Error(
					"Input must be a number or operator(+,-,/,*)"
				);
			} else {
				throw new Error("Input must be a number");
			}
		} else {
			this.operands.push(op)
		}

		return op
	}

	processOperator(op: string): string {
		let result: string | undefined;
		if(op.length === 1 && this.isOperator(op)) {
			result = this.getResult(op).toString()
			this.operands.push(result)			
		} else {
			throw new Error("Input must be an operator(+,-,/,*)")
		}
		return result;
	}

	isOperator(op: string): boolean {
		return ["/", "-", "*", "+"].indexOf(op) !== -1
	}

	isOnlyAcceptingNumbers(): boolean {
		return this.operands.length < 2;
	}

	getResult(op: string): number {
		const second = this.operands.pop()
		const first = this.operands.pop()
		return eval(first + " " + op + " " + second);
	}
}
