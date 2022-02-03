import {tools} from "./tools/prompt-tools";

export function getAndProcessNewInput() {
    const command = tools.prompt();
}

export function main() {
  while (true) {
	  getAndProcessNewInput()
  }
}

