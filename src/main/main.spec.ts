import * as sinon from 'sinon';
import {getAndProcessNewInput, main} from './main';
import {tools} from './tools/prompt-tools';

const sandbox = sinon.createSandbox()
describe("runner", () => {
	let promptStub: sinon.SinonStub
	beforeEach(() => {
		promptStub = sandbox.stub(tools, 'prompt')
	})
	describe("getAndProcessNewInput" , () => {
		it("should get data from the command line prompt", () => {
			getAndProcessNewInput();
			sinon.assert.called(promptStub)
		})
	})
})
