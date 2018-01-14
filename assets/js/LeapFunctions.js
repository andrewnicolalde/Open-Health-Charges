
function LeapFunctions(type) {
    this.previousFrame = null;
    this.openMenu = false;

    this.screenGrabbed = false;
    this.startVector = null;
    this.movementDirection = null;
    //this.endVector = null;

    this.controllerOptions = {enableGestures: true};


    this.mapMovement = function mapMovement(frame) {
        if (frame.hands.length > 0) {
            if (hasTwoHands(frame)) {
                if (bothClosed(frame.hands)) {
                    if(handsOpposing(frame.hands, this.previousFrame)) {
                        var closing = handsClosing(frame.hands, this.previousFrame);
                        if (closing > 0) {
                            console.log("Zoom in");
                        } else if (closing < 0) {
                            console.log("Zoom out");
                        } else {
                            console.log("No Zoom");
                        }
                    }
                }
            } else {
                for (var i = 0; i < frame.hands.length; i++) {
                    var hand = frame.hands[i];
                    if (!this.screenGrabbed) {
                        if (hand.grabStrength >= 0.9) {
                            this.screenGrabbed = true;
                            this.startVector = hand.palmPosition;
                            this.direction = [hand.translation[0], hand.translation[2]];
                            console.log("Screen Grabbed: " + this.screenGrabbed);
                            console.log("Grab Start Vector: " + this.startVector);
                            console.log("Direction" + this.direction);
                        }
                    }

                    if (this.screenGrabbed) {
                        if (hand.grabStrength === 0) {
                            this.screenGrabbed = false;
                            console.log("Screen Grabbed: " + this.screenGrabbed);
                        }
                    }
                }
                return this.screenGrabbed;
            }
        }
    };

    this.getMovementDirection = function () {

    };

    /*this.menuGestures = function menuGestures(frame) {
        if (frame.gestures.length > 0) {
            // check if there are 2 hands. Print to verify. Just to test!!
            for (var i = 0; i < frame.gestures.length; i++) {
                var gesture = frame.gestures[i];
                if (gesture.type === "swipe") {
                    if (gesture.direction[1] < -0.2 && gesture.direction[0] < 0.2 && gesture.direction[0] > -0.2) {
                        //Opens menu
                        this.openMenu = true;
                        console.log("Open Menu");
                        //TODO open menu
                    }
                }

                if (gesture.type === "keyTap" && this.openMenu) {
                    console.log("Clicked");
                    //TODO click menu item
                }
            }
        }

    };*/

    function vectorToString(vector, digits) {
        if (typeof digits === "undefined") {
            digits = 1;
        }
        return "(" + vector[0].toFixed(digits) + ", "
            + vector[1].toFixed(digits) + ", "
            + vector[2].toFixed(digits) + ")";
    }

    function togglePause() {
        paused = !paused;

        if (paused) {
            document.getElementById("pause").innerText = "Resume";
        } else {
            document.getElementById("pause").innerText = "Pause";
        }
    }

    function pauseForGestures() {
        if (document.getElementById("pauseOnGesture").checked) {
            pauseOnGesture = true;
        } else {
            pauseOnGesture = false;
        }
    }

    function hasTwoHands( frame) {
        return frame.hands.length === 2;
    }

    function bothClosed(hands) {
        return hands[0].grabStrength >= 0.9 && hands[1].grabStrength >= 0.9;
    }

    function handsOpposing(hands, previousFrame) {
        var hands2d = [to2d(hands[0].translation(previousFrame)),to2d(hands[1].translation(previousFrame))];
        return dot(hands2d[0], hands2d[1]) < -0.8;
    }

    function handsClosing(hands, previousFrame) {
        var pastHand0 = to2d(previousFrame.hands[0].palmPosition);
        var pastHand1 = to2d(previousFrame.hands[1].palmPosition);
        var pastDist = length(minus(pastHand0, pastHand1));

        var curHand0 = to2d(hands[0].palmPosition);
        var curHand1 = to2d(hands[1].palmPosition);
        var curDist = length(minus(curHand0, curHand1));
        console.log(curDist - pastDist);

        if (curDist - pastDist > 0.0003) {
            return 1;
        } else if (curDist - pastDist < -0.0003) {
            return -1;
        } else {
            return 0;
        }
    }

    function to2d(vec) {
        var xcomp = dot(vec, [1, 0, 0]);
        var zcomp = dot(vec, [0, 0, 1]);
        return toUnit([xcomp, zcomp]);
    }

    function minus(vec1, vec2) {
        return [vec1[0]-vec2[0], vec1[1]-vec2[1]];
    }

    function toUnit(vec) {
        return divide(vec, length(vec));
    }

    function dot(vec1, vec2) {
        if (vec1.length === 2) {
            return (vec1[0] * vec2[0]) + (vec1[1] * vec2[1]);
        } else if (vec1.length === 3) {
            return (vec1[0] * vec2[0]) + (vec1[1] * vec2[1]) + (vec1[2] * vec2[2]);
        }
    }

    function divide(vec, scalar) {
        return [vec[0]/scalar, vec[1]/scalar];
    }

    function length(vec) {
        if (vec.length === 2) {
            var v2 = math.square(vec[0]) + math.square(vec[1]);
            return math.sqrt(v2);
        } else if (vec.length === 3) {
            var v2 = math.square(vec[0]) + math.square(vec[1]) + math.square(vec[2]);
            return math.sqrt(v2);
        }
    }
}

