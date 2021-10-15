const QinStageAgent = require("./QinStageAgent")

// @ponicode
describe("init", () => {
    let inst

    beforeEach(() => {
        inst = new QinStageAgent.default({ renderer: "George", controller: true })
    })

    test("0", () => {
        let callFunction = () => {
            inst.init()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_initLayerAgent", () => {
    let inst

    beforeEach(() => {
        inst = new QinStageAgent.default({ renderer: "Edmond", controller: true })
    })

    test("0", () => {
        let callFunction = () => {
            inst._initLayerAgent()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_initMouseEvent", () => {
    let inst

    beforeEach(() => {
        inst = new QinStageAgent.default({ renderer: "Anas", controller: false })
    })

    test("0", () => {
        let callFunction = () => {
            inst._initMouseEvent()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_initControllerEvent", () => {
    let inst

    beforeEach(() => {
        inst = new QinStageAgent.default({ renderer: "Edmond", controller: false })
    })

    test("0", () => {
        let callFunction = () => {
            inst._initControllerEvent()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("onClickEventTrigger", () => {
    let inst

    beforeEach(() => {
        inst = new QinStageAgent.default({ renderer: "Edmond", controller: false })
    })

    test("0", () => {
        let callFunction = () => {
            inst.onClickEventTrigger(1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.onClickEventTrigger(-5.48)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.onClickEventTrigger(-100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.onClickEventTrigger(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.onClickEventTrigger(100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.onClickEventTrigger(NaN)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("addTerrain", () => {
    let inst

    beforeEach(() => {
        inst = new QinStageAgent.default({ renderer: "Pierre Edouard", controller: false })
    })

    test("0", () => {
        let callFunction = () => {
            inst.addTerrain("4.0.0-beta1\t")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.addTerrain("v1.2.4")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.addTerrain("^5.0.0")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.addTerrain("1.0.0")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.addTerrain("v4.0.0-rc.4")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.addTerrain(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getTerrain", () => {
    let inst

    beforeEach(() => {
        inst = new QinStageAgent.default({ renderer: "Pierre Edouard", controller: true })
    })

    test("0", () => {
        let callFunction = () => {
            inst.getTerrain()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("addUI", () => {
    let inst

    beforeEach(() => {
        inst = new QinStageAgent.default({ renderer: "George", controller: true })
    })

    test("0", () => {
        let callFunction = () => {
            inst.addUI({ key: "elio@example.com" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.addUI({ key: "Dillenberg" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.addUI({ key: "Elio" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.addUI(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("addActor", () => {
    let inst

    beforeEach(() => {
        inst = new QinStageAgent.default({ renderer: "George", controller: false })
    })

    test("0", () => {
        let callFunction = () => {
            inst.addActor({ key: "Dillenberg" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.addActor({ key: "Elio" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.addActor({ key: "elio@example.com" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.addActor(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("clearActors", () => {
    let inst

    beforeEach(() => {
        inst = new QinStageAgent.default({ renderer: "George", controller: true })
    })

    test("0", () => {
        let callFunction = () => {
            inst.clearActors()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("clearUI", () => {
    let inst

    beforeEach(() => {
        inst = new QinStageAgent.default({ renderer: "Pierre Edouard", controller: false })
    })

    test("0", () => {
        let callFunction = () => {
            inst.clearUI()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("render", () => {
    let inst

    beforeEach(() => {
        inst = new QinStageAgent.default({ renderer: "George", controller: false })
    })

    test("0", () => {
        let callFunction = () => {
            inst.render(1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.render(90)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.render(520)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.render(4)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.render(400)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.render(Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
