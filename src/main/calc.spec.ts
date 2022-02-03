import sinon from "sinon";
import {SinonStub} from "sinon";
import { Calc } from "./calc";

const sandbox = sinon.createSandbox();
describe("calc", () => {
	let calc: Calc;
	beforeEach(() => {
		calc = new Calc();
	});
	afterEach(() => {
		sandbox.restore()
	})
	describe("addOperand", () => {
		it("should add operand if it is a number", () => {
			calc.addOperand("2")
			expect(calc.operands).toContain("2")
		});
		it("should throw error that says we need an number or operand if operand is not a number and there is two operands", () => {
				calc.addOperand("3")
				calc.addOperand("4")
			try {
				calc.addOperand("a")
			} catch(e: any) {
				expect(e.message).toBe("Input must be a number or operator(+,-,/,*)")
			}
		})
		it("should throw error that says we need an number if there are not two operands", () => {
			try {
				calc.addOperand("a")
			} catch(e: any) {
				expect(e.message).toBe("Input must be a number")
			}
		})
	});
	describe("processOperator", () => {
		let getResultStub: SinonStub
		beforeEach(() => {
			getResultStub = sandbox.stub(calc, 'getResult');
			getResultStub.returns(2)
		});
		it("should process operator", () => {
			calc.processOperator("/")
			sinon.assert.calledWith(getResultStub, "/")
		})
		it("should throw an error if the input is not an operator", () => {
			try {
				calc.processOperator("a")
			} catch (e: any){
				expect(e.message).toBe("Input must be an operator(+,-,/,*)")
			}	
		})
		it("should add result to end of operand array", () => {
			calc.processOperator("-")
			expect(calc.operands.pop()).toBe("2")
		})
	}) 
	describe("isOperator", () => {
		it("should return true if it is an operator", () => {
			expect(calc.isOperator("*")).toBe(true)
		})
		it("should return false if it is not an operator", () => {
			expect(calc.isOperator("a")).toBe(false)
		})
	})
	describe("isOnlyAcceptingNumbers", () => {
		it("should return true if user has entered an operator", () => {
			calc.addOperand("2")
			expect(calc.isOnlyAcceptingNumbers()).toBeTruthy()
		})
		it("should return false if there have been no operators added ", () => {
			calc.addOperand("2")
			calc.addOperand("3")
			expect(calc.isOnlyAcceptingNumbers()).toBeFalsy()
		})
	})
	describe("getResult", () => {
		it("should work for +", () => {
			calc.addOperand("2")
			calc.addOperand("3")
			expect(calc.getResult("+")).toBe(5)
		})
		it("should work for -", () => {
			calc.addOperand("5")
			calc.addOperand("2")
			expect(calc.getResult("-")).toBe(3)
		})
		it("should work for /", () => {
			calc.addOperand("3")
			calc.addOperand("2")
			expect(calc.getResult("/")).toBe(1.5)
		})
		it("should work for /", () => {
			calc.addOperand("3")
			calc.addOperand("2")
			expect(calc.getResult("*")).toBe(6)
		})
	})
});
