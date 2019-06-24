let reversing = 0
let pitch = 0
let roll = 0
radio.onReceivedValue(function (name, value) {
    if (name == "roll") {
        roll = value / 50
    } else if (name == "pitch") {
        pitch = (0 - value) / 50
    }
    if (pitch > 0) {
        if (reversing == -1) {
            basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
        }
        reversing = 1
    } else {
        if (reversing == 1) {
            basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
        }
        reversing = -1
    }
    pins.servoWritePin(AnalogPin.P1, 90 + roll * reversing + pitch)
    pins.servoWritePin(AnalogPin.P2, 90 + roll * reversing - pitch)
})
let turbo = 0
reversing = 1
radio.setGroup(55)
pitch = 0
roll = 0
basic.forever(function () {
    turbo = 1
    if (input.buttonIsPressed(Button.A)) {
        turbo *= 0.4
    }
    if (input.buttonIsPressed(Button.B)) {
        turbo *= 2
    }
    basic.pause(100)
    radio.sendValue("roll", turbo * input.acceleration(Dimension.X))
    radio.sendValue("pitch", turbo * input.acceleration(Dimension.Y))
})
