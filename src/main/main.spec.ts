import * as sinon from "sinon";
import { Calc } from "./calc";
import { main, tools } from "./main";

const sandbox = sinon.createSandbox();
describe("runner", () => {
	let promptStub: sinon.SinonStub;
	beforeEach(() => {
		promptStub = sandbox.stub(tools, "prompt");
		promptStub.returns("3");
	});
	afterEach(() => {
		sandbox.restore();
	});
	describe("main", () => {
		let getAndProcessNewInputSpy: sinon.SinonStub;
		beforeEach(() => {
			getAndProcessNewInputSpy = sandbox.stub(
				tools,
				"getAndProcessNewInput"
			);
			getAndProcessNewInputSpy.returns(false);
		});
		it("should call getAndProcessNewInput", () => {
			main();
			sandbox.assert.called(getAndProcessNewInputSpy);
		});
	});
	describe("getAndProcessNewInput", () => {
		let calc: Calc;
		let addOperandStub: sinon.SinonStub;
		let executeOperatorStub: sinon.SinonStub;
		beforeEach(() => {
			calc = new Calc();
			addOperandStub = sandbox.stub(calc, "addOperand");
			executeOperatorStub = sandbox.stub(
				calc,
				"processOperator"
			);
		});
		it("should get data from the command line prompt", () => {
			tools.getAndProcessNewInput(calc);
			sinon.assert.called(promptStub);
		});
		it("should return true by default", () => {
			tools.getAndProcessNewInput(calc);
			expect(tools.getAndProcessNewInput(calc)).toBe(true);
		});
		it("should shut down app if 'q' is received", () => {
			promptStub.returns("q");
			tools.getAndProcessNewInput(calc);
			expect(tools.getAndProcessNewInput(calc)).toBe(false);
		});
		it("should shut down app if 'exit' is received", () => {
			promptStub.returns("exit");
			tools.getAndProcessNewInput(calc);
			expect(tools.getAndProcessNewInput(calc)).toBe(false);
		});
		it("should trim and split input on spaces and process it", () => {
			promptStub.returns("23 4 8 ");
			tools.getAndProcessNewInput(calc);
			sinon.assert.calledThrice(addOperandStub);
			sinon.assert.calledWith(addOperandStub, "23");
			sinon.assert.calledWith(addOperandStub, "4");
			sinon.assert.calledWith(addOperandStub, "8");
		});
		it("should not accept operator if we need more numbers", () => {
			const consoleStub = sandbox.stub(console, "log");
			promptStub.returns("/");
			tools.getAndProcessNewInput(calc);
			sinon.assert.calledWith(
				consoleStub,
				'You must enter a number or press "q" to quit'
			);
		});
		it("should try to execute operator if we have enough numbers", () => {
			calc.operands = ["4", "5"];
			promptStub.returns("+");
			executeOperatorStub.returns("9");
			tools.getAndProcessNewInput(calc);
			sinon.assert.calledWith(executeOperatorStub);
		});
		it("should log out the most recent result", () => {
			const consoleStub = sandbox.stub(console, "log");
			calc.operands = ["4", "5"];
			promptStub.returns("+");
			executeOperatorStub.returns("9");
			tools.getAndProcessNewInput(calc);
			sinon.assert.calledWith(
				consoleStub,
				'9'
			);
		});
	});
});
