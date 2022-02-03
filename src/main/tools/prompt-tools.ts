import {BasicOptions, prompt} from 'readline-sync'

export const tools = {
	prompt: (options?: BasicOptions): string => prompt(options)
}
