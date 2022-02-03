import { BasicOptions, prompt } from "readline-sync";
import { Calc } from "./calc";

function getAndProcessNewInput(calc: Calc): boolean {
	const commands = tools.prompt();
	let result = "";
	let stopApplication = false;
	try {
		commands.trim()
			.split(" ")
			.forEach((command) => {
				if (command === "q" || command.toLowerCase() === "exit") {
					stopApplication = true;
					throw new Error("Application stopped");
				} else if (calc.isOperator(command)) {
					if(calc.isOnlyAcceptingNumbers()) {
						throw new Error("You must enter a number or press \"q\" to quit")
					} else {
						result = calc.processOperator(command)
					}
				} else {
					result = calc.addOperand(command)
				}
			});

		console.log(result)
	} catch (e: any) {
		console.log(e.message ? e.message : "An unknown error occured");
	}

	return !stopApplication;
}

export const tools = {
	prompt: (options?: BasicOptions): string => prompt(options),
	getAndProcessNewInput: (calc: Calc): boolean =>
		getAndProcessNewInput(calc),
};

export function main() {
	const calc = new Calc();
	let keepWaiting = true;
	while (keepWaiting) {
		keepWaiting = tools.getAndProcessNewInput(calc);
	}
}
