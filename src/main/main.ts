import { BasicOptions, prompt } from "readline-sync";
import { Calc } from "./calc";

//i'm not super happy with the size of this method, it could be chissled at
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

//tools put into an object for mocking purposes
export const tools = {
	prompt: (options?: BasicOptions): string => prompt(options),
	getAndProcessNewInput: (calc: Calc): boolean =>
		getAndProcessNewInput(calc),
};

export function main() {
	console.log("\n\n// RPN Calculator \\\\")
	console.log("-- start by entering at least two numbers followed by the appropriate operators")
	console.log("-- enter \"q\" or \"exit\" to exit")
	const calc = new Calc();
	let keepWaiting = true;
	while (keepWaiting) {
		keepWaiting = tools.getAndProcessNewInput(calc);
	}
}
